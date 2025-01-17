package com.myme.mycarforme.ui.my

import android.content.Intent
import android.os.Bundle
import android.provider.ContactsContract.Data
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentMyBinding
import com.myme.mycarforme.ui.home.InfoCardAdapter
import com.myme.mycarforme.ui.map.MapActivity
import java.time.LocalDate
import java.time.YearMonth

class Myfragment : Fragment() {
    data class Car2(
        val carId: Int,
        val modelName: String,
        val year: YearMonth, // yyyy-MM 형태로 저장
        val mileage: Int,
        val sellingPrice: Int,
        val mainImage: String,
        val carNumber: String,
        var isLike: Boolean,
        val likeCount: Int,
        val createdAt: LocalDate, // yyyy-MM-dd 형태로 저장
        val updatedAt: LocalDate // yyyy-MM-dd 형태로 저장
    )

    private var _binding: FragmentMyBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
    private val dummyCar = Car2(
        carId = 1689541, // Parse the carId
        modelName = "2024 GV80 Coupe 가솔린 3.5 터보 AWD 쿠페 디자인 셀렉션Ⅱ 카본",
        year = YearMonth.parse("2021-07"),
        mileage = 16510,
        sellingPrice = 42128,
        mainImage = "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_200.JPG/dims/crop/3464x1520+188+840",
        carNumber = "168구9541",
        isLike = false,
        likeCount = 0,
        createdAt = LocalDate.parse("2021-07-15"),
        updatedAt = LocalDate.parse("2021-07-15") // Assuming the same date for now
    )
    private val ordercar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )

    private val recommendcar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )
    private val likecar = ArrayList<Car>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMyBinding.inflate(inflater, container, false)
        val root: View = binding.root
//        binding.myOrderRecyclerview.adapter = InfoCardAdapter(items = ordercar)
//        binding.myOrderRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
//        binding.myUserOrderCountText.text = String.format(ordercar.size.toString())
//        binding.myUserOrderSectionText.text = String.format(ordercar.size.toString())

        binding.myUserNameText.text = SharedPrefs.getUserInfo(requireContext())?.name ?: ""
        val progressBarView = binding.myProgressbar
        val stepLabels = listOf("계약금 입금", "잔금 결제", "탁송 시작", "탁송 완료")
        progressBarView.setupSteps(stepCount = 4, labels = stepLabels)
        // 초기 상태 설정
        progressBarView.updateSteps(3)
        binding.myProgressbutton.setup("배송 현황 보기"){
            buttonTap()
        }

        return root
    }

    override fun onStart() {
        super.onStart()
        context.let{
            DataManager.getLikeCarList(requireContext(),{
                        binding.myLikeRecyclerview.adapter = InfoCardAdapter(items = likecar)
        binding.myLikeRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.myUserLikeCount.text = String.format(likecar.size.toString())
        binding.myUserLikeSectionCount.text = String.format(likecar.size.toString())
            })
            DataManager.getRecommendHistoryCarList(requireContext(),{
                //        binding.myRecommendRecyclerview.adapter = InfoCardAdapter(items = recommendcar)
//        binding.myRecommendRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
//        binding.myUserHistoryCountText.text = String.format(recommendcar.size.toString())
//        binding.myUserHistorySectionCountText.text = String.format(recommendcar.size.toString())
            })
        }

    }

    fun buttonTap() {
        val intent = Intent(requireContext(), MapActivity::class.java)
//        intent.putExtra("car_data", dummyCar) // Parcelable 객체 전달
        startActivity(intent)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}