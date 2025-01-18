package com.myme.mycarforme

import android.content.Context
import android.provider.ContactsContract.Data
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.map
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.OrderCars
import com.myme.mycarforme.data.network.OrderedCarResponse

enum class userStatus{
    CONTRACTED, PAID, DELIVERING, DELIVERED, NONE
}

class MainViewModel : ViewModel() {
    // 각 데이터 리스트를 MutableLiveData로 선언
    private val _popularCars = MutableLiveData<List<Car>>()
    val popularCars: LiveData<List<Car>> = _popularCars

    private val _mmCars = MutableLiveData<List<Car>>()
    val mmCars: LiveData<List<Car>> = _mmCars

    private val _nextCars = MutableLiveData<List<Car>>()
    val nextCars: LiveData<List<Car>> = _nextCars

    private val _likeCars = MutableLiveData<List<Car>>()
    val likeCars: LiveData<List<Car>> = _likeCars

    private val _recommendedCars = MutableLiveData<List<Car>>()
    val recommendedCars: LiveData<List<Car>> = _recommendedCars

    private val _orderCars = MutableLiveData<List<OrderCars>>()
    val orderCars: LiveData<List<OrderCars>> = _orderCars

    fun pushCarsDataMain(popCars: ArrayList<Car>, mCars:ArrayList<Car>, nCars:ArrayList<Car>){
        _popularCars.postValue(popCars)
        _mmCars.postValue(mCars)
        _nextCars.postValue(nCars)
    }

    // 서버에서 데이터 불러오는 메소드
    fun loadCarsDataMain(context: Context) {
        DataManager.getCarsListwithUrl(context, "popular") { cars ->
            _popularCars.postValue(cars)
        }
        DataManager.getCarsListwithUrl(context, "mmscores") { cars ->
            _mmCars.postValue(cars)
        }
        DataManager.getCarsListwithUrl(context, "upcoming") { cars ->
            _nextCars.postValue(cars)
        }
    }

    fun loadCarDataMy(context: Context) {
        DataManager.getLikeCarList(context, { cars ->
            _likeCars.postValue(cars)
        })
        DataManager.getRecommendHistoryCarList(context, { cars ->
            _recommendedCars.postValue(cars)
        })
        DataManager.getOrderedCarList(context,{cars ->
            _orderCars.postValue(cars)
        })
    }

    fun loadCarDataLike(context: Context) {
        DataManager.getLikeCarList(context, { cars ->
            _likeCars.postValue(cars)
        })
    }

    fun toggleLike(context: Context, carId: Int) {
        _popularCars.value = _popularCars.value?.map {
            if (it.carId == carId) {
                it.isLike = !it.isLike
                val updatedLikeCount = if (it.isLike) it.likeCount + 1 else it.likeCount - 1
                it.copy(isLike = it.isLike, likeCount = updatedLikeCount)
            } else it
        }
        _popularCars.value = ArrayList(_popularCars.value?.sortedByDescending  { it.likeCount } ?: emptyList())

        // Update mmCars
        _mmCars.value = _mmCars.value?.map {
            if (it.carId == carId) {
                it.isLike = !it.isLike
                val updatedLikeCount = if (it.isLike) it.likeCount + 1 else it.likeCount - 1
                it.copy(isLike = it.isLike, likeCount = updatedLikeCount)
            } else it
        }

        // Update nextCars
        _nextCars.value = _nextCars.value?.map {
            if (it.carId == carId) {
                it.isLike = !it.isLike
                val updatedLikeCount = if (it.isLike) it.likeCount + 1 else it.likeCount - 1
                it.copy(isLike = it.isLike, likeCount = updatedLikeCount)
            } else it
        }
        loadCarDataLike(context)
    }

    // 데이터 변경 시 서버에서 다시 데이터 불러오기
    fun updateCarData(context: Context, type: String) {
        DataManager.getCarsListwithUrl(context, type) { cars ->
            when (type) {
                "popular" -> _popularCars.postValue(cars)
                "mmscores" -> _mmCars.postValue(cars)
                "upcoming" -> _nextCars.postValue(cars)
            }
        }
    }

    fun removeLikeCars(carId: Int){
        _likeCars.value = _likeCars.value?.filterNot { it.carId == carId }
    }
}

