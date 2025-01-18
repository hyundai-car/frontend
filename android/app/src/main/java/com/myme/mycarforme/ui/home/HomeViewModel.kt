package com.myme.mycarforme.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.myme.mycarforme.data.model.Car

class HomeViewModel : ViewModel() {

    // 첫 번째 배열
    private val _popularCar = MutableLiveData<List<Car>>(emptyList())
    val popularCar: LiveData<List<Car>> get() = _popularCar

    // 두 번째 배열
    private val _mmCar = MutableLiveData<List<Car>>(emptyList())
    val mmCar: LiveData<List<Car>> get() = _mmCar

    // 세 번째 배열
    private val _nextCar = MutableLiveData<List<Car>>(emptyList())
    val nextCar: LiveData<List<Car>> get() = _nextCar

    // 데이터 업데이트 함수
    fun updatePopularCarList(newList: List<Car>) {
        _popularCar.value = newList
    }

    fun updatemmCarList(newList: List<Car>) {
        _mmCar.value = newList
    }

    fun updatenextCarList(newList: List<Car>) {
        _nextCar.value = newList
    }

}