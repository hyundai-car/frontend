package com.myme.mycarforme.ui.home

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.myme.mycarforme.MainViewModel
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.convertRecoCarsToCars
import com.myme.mycarforme.data.network.recoCars
import com.myme.mycarforme.databinding.ViewInfocardBinding
import com.myme.mycarforme.ui.DetailFragment

enum class CardType {
    My, Normal, Order
}

class InfoCardAdapter(private var items: ArrayList<Car>, context : Context, type: CardType, private val viewModel: MainViewModel) :
    RecyclerView.Adapter<InfoCardAdapter.CardViewHolder>() {
        val cardType = type
        val context = context
    inner class CardViewHolder(private val binding: ViewInfocardBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(item: Car, position: Int) {
            Glide.with(binding.infocardImage.context)
                .load(item.mainImage)
                .into(binding.infocardImage)

            binding.infocardCarmodeltext.text = item.carName
            binding.infocardPricetext.text = String.format("%,d", item.sellingPrice)
            binding.infocardDatetext.text = item.initialRegistration
            binding.infocardDisttext.text = String.format("%,d", item.mileage) +"KM"
            binding.infocardLikenumtext.text = String.format("%,d", item.likeCount)

            when (cardType){
                CardType.Normal->{
                    binding.infocardHeartButton.setImageResource(
                        if (item.isLike) R.drawable.ic_heart_fill else R.drawable.ic_heart_blank
                    )
                    binding.infocardHeartButton.setOnClickListener {
                        binding.infocardHeartButton.setImageResource(
                            if (item.isLike) R.drawable.ic_heart_fill else R.drawable.ic_heart_blank
                        )
                        DataManager.likeCar(context ,item.carId, {viewModel.toggleLike(context, item.carId)})

                    }
                }
                CardType.My ->{
                    binding.infocardLikenumtext.text = ""
                    binding.infocardHeartButton.setImageResource(R.drawable.ic_heart_fill)
                    binding.infocardHeartButton.setOnClickListener {
                        DataManager.likeCar(context ,item.carId, {
                            viewModel.toggleLike(context, item.carId)
                            viewModel.loadCarsDataMain(context)})
                        viewModel.removeLikeCars(item.carId)
                    }
                }
                CardType.Order ->{
                    binding.infocardHeartButton.visibility = View.GONE
                }
            }

            binding.root.setOnClickListener {
                    //TODO: 디테일로 이동
                val bundle = Bundle()
                bundle.putInt("carId", item.carId)  // carId를 번들로 전달
                val transaction = (context as AppCompatActivity).supportFragmentManager.beginTransaction()
                val detailFragment = DetailFragment()
                detailFragment.arguments = bundle
                transaction.add(R.id.nav_host_fragment_activity_main, detailFragment) // 디테일 프래그먼트로 교체
                transaction.addToBackStack(null) // 뒤로가기 스택에 추가
                transaction.commit()

                // 툴바와 네비게이션 바 숨기기
                (context as AppCompatActivity).findViewById<View>(R.id.main_toolbar).visibility = View.GONE
                (context as AppCompatActivity).findViewById<View>(R.id.nav_view).visibility = View.GONE

            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        val binding = ViewInfocardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CardViewHolder(binding)
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        holder.bind(items[position],position)
    }

    fun updateItems(newItems: List<Car>) {
        items = newItems as ArrayList<Car>
        notifyDataSetChanged()
    }

    fun updateReItems(newItems: List<recoCars>){
        items = convertRecoCarsToCars(newItems)
//        items = newItems as ArrayList<recoCars>
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int = items.size
}