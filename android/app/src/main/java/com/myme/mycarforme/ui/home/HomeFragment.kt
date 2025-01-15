package com.myme.mycarforme.ui.home

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.databinding.FragmentHomeBinding
import java.time.LocalDate
import java.time.YearMonth

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

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
    private val popularCar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )

    private val funtureCar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )

    private val nextCar = mutableListOf(
        dummyCar,dummyCar,dummyCar,dummyCar,dummyCar
    )


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {


        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val imageLinks = mapOf(
            binding.homeEventimage1 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010332",
            binding.homeEventimage2 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010333",
            binding.homeEventimage3 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010325",
            binding.homeEventimage4 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010326",
            binding.homeEventimage5 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010327",
            binding.homeEventimage6 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010328",
        )

        for ((imageView, url) in imageLinks) {
            imageView.setOnClickListener {
                openLink(url)
            }
        }

        val root: View = binding.root
        binding.homePopularRecyclerview.adapter = InfoCardAdapter(items = popularCar)
        binding.homePopularRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeFutureRecyclerview.adapter = InfoCardAdapter(items = funtureCar)
        binding.homeFutureRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeNextRecyclerview.adapter = InfoCardAdapter(items = nextCar)
        binding.homeNextRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        return root
    }
    private fun openLink(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}