package com.myme.mycarforme

import android.os.Bundle
import android.view.View
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsCompat.CONSUMED
import androidx.core.view.updatePadding
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.myme.mycarforme.databinding.ActivityMainBinding
import com.myme.mycarforme.ui.home.HomeFragment
import com.myme.mycarforme.ui.my.Myfragment
import com.myme.mycarforme.ui.recommend.RecommendFragment
import com.myme.mycarforme.ui.search.SearchFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var activeFragment: Fragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView
        val homeFragment = HomeFragment()
        val searchFragment = SearchFragment()
        val recommendFragment = RecommendFragment()
        val myFragment = Myfragment()

        val navController = findNavController(R.id.nav_host_fragment_activity_main)

        navView.setupWithNavController(navController)
        supportFragmentManager.beginTransaction()
            .add(R.id.nav_host_fragment_activity_main, homeFragment, "FIRST").hide(homeFragment)
            .add(R.id.nav_host_fragment_activity_main, searchFragment, "SECOND").hide(searchFragment)
            .add(R.id.nav_host_fragment_activity_main, recommendFragment, "THIRD").hide(recommendFragment)
            .add(R.id.nav_host_fragment_activity_main, myFragment, "FOURTH").hide(myFragment)
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
        ViewCompat.setOnApplyWindowInsetsListener(
            window.decorView
        ) { v, insets ->
            val windowInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            findViewById<View>(R.id.container).updatePadding(bottom = windowInsets.bottom, top = windowInsets.top)

            return@setOnApplyWindowInsetsListener CONSUMED
        }
    }
    private fun switchFragment(fragment: Fragment) {
        if (activeFragment != fragment) {
            supportFragmentManager.beginTransaction().hide(activeFragment!!).show(fragment).commit()
            activeFragment = fragment
        }
    }

}