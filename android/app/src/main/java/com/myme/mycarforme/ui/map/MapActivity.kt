package com.myme.mycarforme.ui.map

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.LinearLayout
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.firebase.messaging.FirebaseMessaging
import com.google.gson.Gson
import com.myme.mycarforme.R
import com.myme.mycarforme.StompClient
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.DataManager.getCode
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.ActivityMapBinding
import com.naver.maps.geometry.LatLng
import com.naver.maps.geometry.LatLngBounds
import com.naver.maps.map.CameraUpdate
import com.naver.maps.map.MapFragment
import com.naver.maps.map.NaverMap
import com.naver.maps.map.OnMapReadyCallback
import com.naver.maps.map.overlay.Marker
import com.naver.maps.map.overlay.PolylineOverlay
import com.naver.maps.map.util.MarkerIcons
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONException
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Locale

class MapActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var binding: ActivityMapBinding
    private lateinit var navermap: NaverMap
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var latitude: Double = 0.0
    private var longitude: Double = 0.0
    private lateinit var pathTime : String
    private lateinit var bottomSheet: LinearLayout
    private var stompClient: StompClient? = null
    private val scope = CoroutineScope(Dispatchers.Main + Job())
    private var trackingCode: String? = null
    private lateinit var movingCar : Car
    var currentMarker: Marker? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMapBinding.inflate(layoutInflater)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        setContentView(binding.root)
        requestLocationPermission()
        val mapFragment = supportFragmentManager.findFragmentById(R.id.map_mapfragment) as MapFragment?
            ?: MapFragment.newInstance().also {
                supportFragmentManager.beginTransaction().add(R.id.map_mapfragment, it).commit()
            }
        mapFragment.getMapAsync(this)
        val progressBarView = binding.mapBottomProgressbar
        val stepLabels = listOf("준 비 중", "탁송 시작", "탁송 완료")
        progressBarView.setupSteps(stepCount = 3, labels = stepLabels)
        // 초기 상태 설정
        progressBarView.updateSteps(2)
        val intent : Intent = intent
        val status = intent.getStringExtra("user")
        val movingCar = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU){
            intent.getParcelableExtra("cardata", Car::class.java)
        } else {
            intent.getParcelableExtra("cardata") as? Car
        }

        createNotificationChannel()
        lifecycleScope.launch {
            try {
                // FCM 토큰 가져오기
                val token = FirebaseMessaging.getInstance().token.await()
                Log.d("FCM_TOKEN", "토큰: $token")
                // 서버로 FCM 토큰 전송
                DataManager.sendCode(context = this@MapActivity, token = token) {
                    // Tracking Code 가져오기

                }
                DataManager.getCode(context = this@MapActivity) { it ->
                    it?.let {
                        Log.d("chk", "Tracking Code: $it")
                        trackingCode = it
                        connectWebSocket()
                    } ?: Log.w("chk", "Tracking Code is null")
                }
            } catch (e: Exception) {
                Log.w("FCM_TOKEN", "FCM 토큰 가져오기 실패: ${e.message}")
            }
        }



        bottomSheet = binding.bottomSheet
        Glide.with(binding.mapBottomCarImage.context)
            .load(movingCar?.mainImage)
            .into(binding.mapBottomCarImage)
        binding.mapBottomCarNameText.text = movingCar?.carName
        binding.mapBottomCarModelText.text = movingCar?.initialRegistration
        binding.mapBottomCarPriceText.text = movingCar?.sellingPrice.toString()
        binding.mapBottomCarInfoCard.setOnClickListener {
            //TODO: 클릭시 차량 디테일로 넘어가기
        }
        binding.mapCloseButton.setOnClickListener {
            intent.putExtra("navigate_to_fragment", "MyFragment")
            intent.putExtra("user",status)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            finish()
        }
    }


    override fun onMapReady(naverMap: NaverMap) {
        this.navermap = naverMap
    }

    private fun createRoute(){
        val start = "${longitude}%2C${latitude}" // 출발지 경도,위도
        val endLong = 126.8851
        val endLat = 37.48226
        val goal = "${endLong}%2C${endLat}" // 목적지 경도,위도
        CoroutineScope(Dispatchers.IO).launch {
            val url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=$start&goal=$goal"
            val request = Request.Builder()
                .url(url)
                .addHeader("x-ncp-apigw-api-key-id", "08nq8yjkey")
                .addHeader("x-ncp-apigw-api-key", "CKLiJhFfMn1msQnyJjJgQOu0tfoYqq72Qls4MO2v")
                .build()

            val client = OkHttpClient()
            val response = client.newCall(request).execute()
            val responseBody = response.body?.string()

            if (responseBody != null) {
                try {
                    val jsonResponse = JSONObject(responseBody)
                    val route = jsonResponse.getJSONObject("route")
                    // trafast 키가 존재하는지 확인
                    if (route.has("traoptimal")) {
                        val traoptimal = route.getJSONArray("traoptimal")
                        val pathArray = traoptimal.getJSONObject(0).getJSONArray("path")
                        //ToDo: pathTime은 도착 시간
                        pathTime = traoptimal.getJSONObject(0).getJSONObject("summary").getString("departureTime")
                        val formattedTime = formatTimeWithAMPM(pathTime)
                        withContext(Dispatchers.Main) {
                            binding.mapBottomDateText.text = formattedTime
                        }
                        val coordinates = mutableListOf<LatLng>()
                        for (i in 0 until pathArray.length()) {
                            val point = pathArray.getJSONArray(i)
                            val longitude = point.getDouble(0)
                            val latitude = point.getDouble(1)
                            coordinates.add(LatLng(latitude, longitude))
                        }
                        val startLocation = LatLng(latitude, longitude)
                        val endLocation = LatLng(endLat, endLong)

                        withContext(Dispatchers.Main) {
                            // 시작점 마커 추가
                            val startMarker = Marker().apply {
                                icon = MarkerIcons.BLACK
                                iconTintColor = ContextCompat.getColor(this@MapActivity, R.color.blue)
                                position = startLocation
                                captionText = "목적지"
                                map = navermap
                            }

                            // 끝점 마커 추가
                            val endMarker = Marker().apply {
                                icon = MarkerIcons.BLACK
                                iconTintColor = ContextCompat.getColor(this@MapActivity, R.color.blue)
                                position = endLocation
                                captionText = "시작지"
                                map = navermap
                            }

                            // 경로 그리기
                            val polyline = PolylineOverlay().apply {
                                color = ContextCompat.getColor(this@MapActivity, R.color.blue)
                                width = 10
                                coords = coordinates
                            }
                            polyline.map = navermap

                            val builder = LatLngBounds.Builder()
                            builder.include(startLocation)
                            builder.include(endLocation)

                            // 시작점과 끝점이 포함되도록 카메라를 이동
                            val bounds = builder.build()
                            val cameraUpdate = CameraUpdate.fitBounds(bounds, 200)
                            navermap.moveCamera(cameraUpdate)

                        }
                    } else {
                        // trafast가 없는 경우 처리
                        withContext(Dispatchers.Main) {
                            Toast.makeText(this@MapActivity, "traoptimal 정보가 없습니다.", Toast.LENGTH_SHORT).show()
                        }
                    }
                } catch (e: JSONException) {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@MapActivity, "JSON 파싱 오류: ${e.message}", Toast.LENGTH_SHORT).show()
                    }
                }
            } else {
                // 응답 본문이 없을 경우 처리
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@MapActivity, "경로를 가져올 수 없습니다.", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private val locationPermissionRequest = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        when {
            permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true ||
                    permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true -> {
                getUserLocation { lat, lng ->
                    this.latitude = lat
                    this.longitude = lng
                    val cameraUpdate = CameraUpdate.scrollTo(LatLng(lat, lng))
                    createRoute()
                }
            }
            else -> {
                Toast.makeText(this, "위치 권한이 필요합니다.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun requestLocationPermission() {
        locationPermissionRequest.launch(
            arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            )
        )
    }

    private fun getUserLocation(onLocationReceived: (Double, Double) -> Unit) {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }

        fusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                val lat = location.latitude
                val lng = location.longitude
                onLocationReceived(lat, lng)
            } else {
                Toast.makeText(this, "위치를 가져올 수 없습니다.", Toast.LENGTH_SHORT).show()
            }
        }.addOnFailureListener { e ->
            Toast.makeText(this, "위치 요청 실패: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    fun formatTimeWithAMPM(dateString: String): String {
        return try {
            // 주어진 dateString을 파싱
            val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val date = dateFormat.parse(dateString)

            // 만약 date가 null이 아니면, 시간을 "hh:mm a" 형식으로 포맷
            date?.let {
                val timeFormat = SimpleDateFormat("a hh시mm분 ", Locale.getDefault()) // 오전/오후 포함
                return timeFormat.format(date)
            } ?: "시간 정보 없음" // date가 null이면 기본값 반환
        } catch (e: Exception) {
            // 예외 발생 시 기본값 반환
            "잘못된 시간 포맷"
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "CHANNEL_ID",
                "알림 채널명",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun connectWebSocket() {
        val url = "https://mycarf0r.me/ws/tracking"
        val accessToken = SharedPrefs.getAccessToken(this)

        val stompClient = StompClient.create(url, scope)

        stompClient.connect(
            headers = mapOf(
                "Authorization" to "$accessToken",
                "clientType" to "sub"
            )
        ) { success ->
            if (success) {
                Log.d("qwe123123123","$trackingCode")
                // 연결 성공 시 구독 시작
                trackingCode?.let { code ->
                    val destination = "/sub/tracking/$code/location"
                    Log.d("LocationReceiver", "Subscribing to: $destination")

                    stompClient.subscribe(destination) { message ->
                        try {
                            Log.d("LocationReceiver", "Received raw message: $message")
                            val location = Gson().fromJson(message, StompClient.LocationUpdate::class.java)
                            Log.d("LocationReceiver", "Parsed location: lat=${location.latitude}, lng=${location.longitude}")
                            currentMarker?.map = null
                            // 새로운 마커 추가
                            currentMarker = Marker().apply {
                                icon = MarkerIcons.BLACK
                                iconTintColor = ContextCompat.getColor(this@MapActivity, R.color.gray_blue)
                                position = LatLng(location.latitude, location.longitude)
                                map = navermap
                            }
                        } catch (e: Exception) {
                            Log.e("LocationReceiver", "Error parsing message: $message", e)
                        }
                    }

                }
            }
            else{
                Log.w("qwe","qweqweqweq")
            }
        }

        this.stompClient = stompClient
    }

}