package ml.jinliming.anr;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class MyService extends Service {
    public MyService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        throw null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            Thread.sleep(60000);
        } catch(InterruptedException e) {
            //
        }
        stopSelf();
        return START_NOT_STICKY;
    }
}
