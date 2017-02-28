package ml.jinliming.anr;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String BroadcastAction = "ml.jinliming.anr.Broadcast_ANR";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loadButton();

        //注册Broadcast接收器
        MyReceiver receiver = new MyReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(BroadcastAction);
        registerReceiver(receiver, filter);
    }

    private void loadButton() {
        Button btnMainThread = (Button)findViewById(R.id.btnMainThread);
        Button btnBroadcastReceiver = (Button)findViewById(R.id.btnBroadcastReceiver);
        Button btnService = (Button)findViewById(R.id.btnService);

        ButtonClick btnClick = new ButtonClick();
        btnMainThread.setOnClickListener(btnClick);
        btnBroadcastReceiver.setOnClickListener(btnClick);
        btnService.setOnClickListener(btnClick);
    }

    class ButtonClick implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            Intent intent;
            switch(v.getId()) {
                //主线程ANR
                case R.id.btnMainThread:
                    try {
                        Thread.sleep(60000);
                    } catch(InterruptedException e) {
                        //
                    }
                    Toast.makeText(MainActivity.this, "程序已恢复响应", Toast.LENGTH_SHORT).show();
                    break;
                //Broadcast Receiver ANR
                case R.id.btnBroadcastReceiver:
                    intent = new Intent(BroadcastAction);
                    sendBroadcast(intent);
                    break;
                //Service ANR
                case R.id.btnService:
                    intent = new Intent(MainActivity.this, MyService.class);
                    startService(intent);
                    break;
            }
        }
    }
}
