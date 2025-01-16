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
    val year: String, // yyyy-MM 형태로 저장
    val mileage: Int,
    val sellingPrice: Int,
    val mainImage: String,
    val mmScore: Double,
    var isLike: Boolean,
    val likeCount: Int,
    val createdAt: String, // yyyy-MM-dd 형태로 저장
    val updatedAt: String // yyyy-MM-dd 형태로 저장
) : Parcelable {
    // YearMonth와 LocalDate는 직렬화가 불가능하므로, 문자열 형태로 변환 및 복원합니다.
    constructor(parcel: Parcel) : this(
        parcel.readInt(),
        parcel.readString() ?: "",
        parcel.readString() ?: "",
        parcel.readInt(),
        parcel.readInt(),
        parcel.readString() ?: "",
        parcel.readDouble() ?: 0.0,
        parcel.readByte() != 0.toByte(),
        parcel.readInt(),
        parcel.readString() ?: "",
        parcel.readString() ?: ""
    )

    override fun describeContents(): Int = 0
}
