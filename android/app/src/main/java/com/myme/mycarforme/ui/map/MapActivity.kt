package com.myme.mycarforme.ui.map

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.myme.mycarforme.R
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
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONException
import org.json.JSONObject

class MapActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var binding: ActivityMapBinding
    private lateinit var navermap: NaverMap
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var latitude: Double = 0.0
    private var longitude: Double = 0.0
    private lateinit var pathTime : Any

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
                        pathTime = traoptimal.getJSONObject(0).getJSONObject("summary").get("departureTime")
                        binding.mapBottomDateText.text = "${pathTime}"
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
//                    navermap.moveCamera(cameraUpdate)
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




}