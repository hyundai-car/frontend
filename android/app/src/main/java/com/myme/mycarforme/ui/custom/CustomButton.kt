package com.myme.mycarforme.ui.custom
import android.content.Context
import android.util.AttributeSet
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import com.myme.mycarforme.R

class CustomButton @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr) {

    private val textView: TextView

    init {
        // Inflate custom layout
        inflate(context, R.layout.view_custom_button, this)

        // Initialize TextView
        textView = findViewById(R.id.textView)
    }

    /**
     * Sets the button's text and click event listener.
     * @param text The text to display on the button.
     * @param onClick The function to execute when the button is clicked.
     */
    fun setup(text: String, onClick: () -> Unit) {
        textView.text = text
        textView.setOnClickListener { onClick() }
    }
}