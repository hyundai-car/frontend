package com.peeptodo.peep_todo_android.ui.customview

import android.content.Context
import android.graphics.drawable.GradientDrawable
import android.util.AttributeSet
import android.util.TypedValue
import android.widget.LinearLayout
import androidx.core.content.ContextCompat
import com.myme.mycarforme.R

class RoundedLayout
@JvmOverloads
constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {
    private var backgroundDrawable: GradientDrawable = GradientDrawable().apply {
        shape = GradientDrawable.RECTANGLE
        setColor(ContextCompat.getColor(context,R.color.white))
        setStroke(1, ContextCompat.getColor(context, R.color.gray_blue))
        cornerRadius = 40f
    }

    init {

        background = backgroundDrawable

        val defaultPadding =
            TypedValue
                .applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP,
                    8f,
                    resources.displayMetrics,
                ).toInt()
        setPadding(defaultPadding, defaultPadding, defaultPadding, defaultPadding)

        elevation = TypedValue
            .applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                6f, // Adjust shadow depth
                resources.displayMetrics
            )

    }
}
