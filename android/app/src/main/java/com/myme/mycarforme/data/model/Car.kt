package com.myme.mycarforme.data.model
import java.time.LocalDate
import java.time.YearMonth

data class Car(
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