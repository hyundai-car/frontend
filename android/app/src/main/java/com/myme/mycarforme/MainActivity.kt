package com.myme.mycarforme

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsCompat.CONSUMED
import androidx.core.view.updatePadding
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.databinding.ActivityMainBinding
import com.myme.mycarforme.ui.DetailFragment
import com.myme.mycarforme.ui.home.HomeFragment
import com.myme.mycarforme.ui.my.MyFragment
import com.myme.mycarforme.ui.recommend.RecommendFragment
import com.myme.mycarforme.ui.search.SearchFragment

class MainActivity : AppCompatActivity() {

    lateinit var binding: ActivityMainBinding
    var activeFragment: Fragment? = null
    val mainViewModel: MainViewModel by viewModels()
    val homeFragment = HomeFragment()
    val searchFragment = SearchFragment()
    val recommendFragment = RecommendFragment()
    val myFragment = MyFragment()
    val detailFragment = DetailFragment()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val popularCar = intent.getParcelableArrayListExtra<Car>("popular")
        val mmCar = intent.getParcelableArrayListExtra<Car>("mm")
        val nextCar = intent.getParcelableArrayListExtra<Car>("next")
        val status = intent.getStringExtra("user")
        val orderingID = intent.getIntExtra("carid",0)
        Log.d("chk2","$orderingID")
        mainViewModel.pushCarsDataMain(popularCar!!,mmCar!!,nextCar!!)
        mainViewModel.loadCarDataMy(this)
        mainViewModel.saveStatus(status)
        mainViewModel.saveCar(orderingID)
        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)

        navView.setupWithNavController(navController)
        supportFragmentManager.beginTransaction()
            .add(R.id.nav_host_fragment_activity_main, homeFragment, "FIRST").hide(homeFragment)
            .add(R.id.nav_host_fragment_activity_main, searchFragment, "SECOND").hide(searchFragment)
            .add(R.id.nav_host_fragment_activity_main, recommendFragment, "THIRD").hide(recommendFragment)
            .add(R.id.nav_host_fragment_activity_main, myFragment, "FOURTH").hide(myFragment)
            .add(R.id.nav_host_fragment_activity_main, detailFragment, "FIFTH").hide(detailFragment)
            .commit()
        activeFragment = homeFragment
        supportFragmentManager.executePendingTransactions()
        supportFragmentManager.beginTransaction().show(homeFragment).commit()
        binding.navView.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_home -> switchFragment(homeFragment)
                R.id.navigation_search -> switchFragment(searchFragment)
                R.id.navigation_recommend -> switchFragment(recommendFragment)
                R.id.navigation_my -> switchFragment(myFragment)
            }
            true
        }
        binding.mainToolbar.toolbarActionButton.setOnClickListener {
            switchFragment(searchFragment)
            binding.navView.selectedItemId = R.id.navigation_search
        }
        ViewCompat.setOnApplyWindowInsetsListener(
            window.decorView
        ) { v, insets ->
            val windowInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            findViewById<View>(R.id.container).updatePadding(bottom = windowInsets.bottom, top = windowInsets.top)

            return@setOnApplyWindowInsetsListener CONSUMED
        }

    }
//    fun switchFragment(fragment: Fragment) {
//        if (activeFragment != fragment) {
//            supportFragmentManager.beginTransaction().hide(activeFragment!!).commit()
//            supportFragmentManager.beginTransaction().show(fragment).commit()
//            activeFragment = fragment
//        }
//    }
fun switchFragment(fragment: Fragment) {
    if (activeFragment != fragment) {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.hide(activeFragment!!)
        transaction.show(fragment)
        transaction.commitAllowingStateLoss()
        activeFragment = fragment
    }
}
    fun navigateToFragment() {
        binding.mainToolbar.root.visibility = View.VISIBLE
        binding.navView.rootView.visibility = View.VISIBLE
                supportFragmentManager.beginTransaction()
                    .replace(R.id.nav_host_fragment_activity_main, MyFragment())
                    .addToBackStack(null)
                    .commit()
        }
}


