package ml.jinliming.anr;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            Thread.sleep(60000);
        } catch(InterruptedException e) {
            //
        }
    }
}
