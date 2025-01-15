package com.myme.mycarforme.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.databinding.ViewInfocardBinding

class InfoCardAdapter(private val items:List<Car>) :
    RecyclerView.Adapter<InfoCardAdapter.CardViewHolder>() {

    inner class CardViewHolder(private val binding: ViewInfocardBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(item: Car) {
            Glide.with(binding.infocardImage.context)
                .load(item.mainImage)
                .into(binding.infocardImage)

            binding.infocardCarmodeltext.text = item.modelName
            binding.infocardPricetext.text = String.format("%,d", item.sellingPrice)
            binding.infocardDatetext.text = item.year.toString()
            binding.infocardDisttext.text = String.format("%,d", item.mileage) +"KM"
            binding.infocardLikenumtext.text = String.format("%,d", item.likeCount)
            binding.infocardHeartButton.setOnClickListener {
                item.isLike = !item.isLike
                binding.infocardHeartButton.setImageResource(
                    if (item.isLike) R.drawable.ic_heart_fill else R.drawable.ic_heart_blank
                )
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        val binding = ViewInfocardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CardViewHolder(binding)
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        holder.bind(items[position])
    }

    override fun getItemCount(): Int = items.size
}