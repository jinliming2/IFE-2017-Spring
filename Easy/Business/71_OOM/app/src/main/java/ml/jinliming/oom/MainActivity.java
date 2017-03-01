package ml.jinliming.oom;

import android.app.Activity;
import android.content.Intent;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private ImageView imgAnimation;
    /**
     * OOM1: 静态Activities
     * 在Activity中创建一个静态的私有成员，
     * 如果在Activity被销毁时，该静态成员引用的对象却没有被清除，
     * 在外部又无法访问私有成员，
     * 这将导致MainActivity无法被回收，从而引发内存泄露
     * 大量内存泄露导致OOM
     * 这里我使用List来模拟保存大量Activity
     */
    private static ArrayList<Activity> activity = new ArrayList<>();

    /**
     * OOM2: 静态Views
     * 将一个当前Activity中的View放到一个静态成员中，也会引发内存泄露
     * 大量内存泄露导致OOM
     * 这里我使用List来模拟保存大量View
     */
    private static ArrayList<View> view = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loadButton();
    }

    private void loadButton() {
        Button btnStaticActivities = (Button)findViewById(R.id.btnStaticActivities);
        Button btnStaticViews = (Button)findViewById(R.id.btnStaticViews);
        Button btnSingleton = (Button)findViewById(R.id.btnSingleton);
        Button btnAnimation = (Button)findViewById(R.id.btnAnimation);

        ButtonClick btnClick = new ButtonClick();
        btnStaticActivities.setOnClickListener(btnClick);
        btnStaticViews.setOnClickListener(btnClick);
        btnSingleton.setOnClickListener(btnClick);
        btnAnimation.setOnClickListener(btnClick);

        imgAnimation = (ImageView)findViewById(R.id.imgAnimation);
    }

    /**
     * 重启Activity
     */
    private void restart() {
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }

    class ButtonClick implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            switch(v.getId()) {
                //静态 Activity
                case R.id.btnStaticActivities:
                    //将当前的Activity对象交给一个私有静态成员，从而引发内存泄露
                    activity.add(MainActivity.this);
                    //重启Activity导致内存泄露
                    restart();
                    break;
                //静态 View
                case R.id.btnStaticViews:
                    //将当前Activity中的一个View交给一个私有静态成员，从而引发内存泄露
                    view.add(v);
                    //重启Activity导致内存泄露
                    restart();
                    break;
                //单例
                case R.id.btnSingleton:
                    /**
                     * OOM3: 单例
                     * 不断往单例对象中追加数据，使得单例对象越来越大，最终OOM
                     */
                    //不断往单例对象中追加数据
                    Singleton.getInstance().data.add(Math.random());
                    break;
                //动画
                case R.id.btnAnimation:
                    /**
                     * OOM4: 逐帧动画
                     * 逐帧动画会一次性将所有帧加载到内存
                     * 如果图片过大，将直接OOM
                     * 如果一个动画不会OOM，那就同时加载多个
                     */
                    imgAnimation.setImageResource(R.drawable.animation);
                    ((AnimationDrawable)imgAnimation.getDrawable()).start();
                    break;
            }
        }
    }
}
