package com.myme.mycarforme.data.model
import android.os.Parcel
import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import java.time.LocalDate
import java.time.YearMonth

@Parcelize
data class Car(
    val carId: Int,
    val carName: String,
    val initialRegistration: String, // yyyy-MM 형태로 저장
    val mileage: Int,
    val sellingPrice: Int,
    val mainImage: String,
    val mmScore: Double,
    var isLike: Boolean,
    val likeCount: Int,
    val createdAt: String, // yyyy-MM-dd 형태로 저장
    val updatedAt: String // yyyy-MM-dd 형태로 저장
) : Parcelable