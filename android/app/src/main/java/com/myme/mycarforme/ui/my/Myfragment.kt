package com.myme.mycarforme.ui.my

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.databinding.FragmentMyBinding
import com.myme.mycarforme.ui.home.InfoCardAdapter
import java.time.LocalDate
import java.time.YearMonth

class Myfragment : Fragment() {

    private var _binding: FragmentMyBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
    private val dummyCar = Car(
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
    private val recentcar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val myViewModel =
            ViewModelProvider(this).get(MyViewModel::class.java)

        _binding = FragmentMyBinding.inflate(inflater, container, false)
        val root: View = binding.root
        binding.myOrderRecyclerview.adapter = InfoCardAdapter(items = ordercar)
        binding.myOrderRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.myRecommendRecyclerview.adapter = InfoCardAdapter(items = recommendcar)
        binding.myRecommendRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.myRecentRecyclerview.adapter = InfoCardAdapter(items = recentcar)
        binding.myRecentRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        fun updateSteps(currentStep: Int) {
            val stepImages = listOf(
                binding.step1,binding.step2,binding.step3,binding.step4

            )

            val stepLines = listOf(
                binding.line1, binding.line2, binding.line3
            )

            for (i in stepImages.indices) {
                if (i < currentStep) {
                    stepImages[i].setImageResource(R.drawable.ic_step_active)
                    if (i < stepLines.size) {
                        stepLines[i].setBackgroundColor(ContextCompat.getColor(requireContext(), R.color.blue))
                    }
                } else {
                    stepImages[i].setImageResource(R.drawable.ic_step_inactive)
                    if (i < stepLines.size) {
                        stepLines[i].setBackgroundColor(ContextCompat.getColor(requireContext(), R.color.white))
                    }
                }
            }
        }
        updateSteps(3)

        return root
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}