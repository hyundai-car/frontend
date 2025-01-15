package com.myme.mycarforme.ui.custom

import android.content.Context
import android.print.PrintAttributes.Margins
import android.util.AttributeSet
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import com.myme.mycarforme.R

class ProgressBar @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : LinearLayout(context, attrs, defStyleAttr) {

    private val stepImages = mutableListOf<ImageView>()
    private val stepLines = mutableListOf<View>()

    init {
        // XML 레이아웃 inflate
        LayoutInflater.from(context).inflate(R.layout.view_progressbar, this, true)
    }

    fun setupSteps(stepCount: Int, labels: List<String>) {
        removeAllViews() // 초기화

        for (i in 0 until stepCount) {
            // Step 이미지
            val stepContainer = LinearLayout(context).apply {
                layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
                orientation = VERTICAL
                gravity = Gravity.CENTER
            }

            val stepImage = ImageView(context).apply {
                layoutParams = LayoutParams(30.dpToPx(), 30.dpToPx())
                setImageResource(R.drawable.ic_step_inactive) // 기본 아이콘
            }
            stepImages.add(stepImage)
            stepContainer.addView(stepImage)

            // Step 라벨
            val label = TextView(context).apply {
                layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
                text = labels.getOrNull(i) ?: ""
                textSize = 14f
                setPadding(0, 4.dpToPx(), 0, 0)
                gravity = Gravity.CENTER
            }
            stepContainer.addView(label)
            addView(stepContainer)

            // 라인 추가 (마지막 Step 뒤에는 추가하지 않음)
            if (i < stepCount - 1) {
                val line = View(context).apply {
                    layoutParams = LayoutParams(40.dpToPx(), 2.dpToPx()).apply {
                        setMargins(0,15.dpToPx(),0,0)
                    }
                    setBackgroundColor(ContextCompat.getColor(context, R.color.white))
                }
                stepLines.add(line)
                addView(line)
            }
        }
    }

    fun updateSteps(currentStep: Int) {
        for (i in stepImages.indices) {
            if (i < currentStep) {
                stepImages[i].setImageResource(R.drawable.ic_step_active)
                if (i < stepLines.size) {
                    stepLines[i].setBackgroundColor(ContextCompat.getColor(context, R.color.blue))
                }
            } else {
                stepImages[i].setImageResource(R.drawable.ic_step_inactive)
                if (i < stepLines.size) {
                    stepLines[i].setBackgroundColor(ContextCompat.getColor(context, R.color.white))
                }
            }
        }
    }

    private fun Int.dpToPx(): Int {
        return (this * context.resources.displayMetrics.density).toInt()
    }
}