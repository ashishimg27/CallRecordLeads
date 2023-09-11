package com.call_recording_leads;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.uimanager.IllegalViewOperationException;
import java.util.ArrayList;
import java.util.List;

public class PermissionFileModule
  extends ReactContextBaseJavaModule
  implements ActivityEventListener {

  public PermissionFileModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public void onActivityResult(
    Activity activity,
    int requestCode,
    int resultCode,
    Intent data
  ) {
    // if (requestCode == 2256) {
    //   if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
    //     if (Environment.isExternalStorageManager()) {
    //       Toast
    //         .makeText(
    //           getReactApplicationContext(),
    //           "Access granted",
    //           Toast.LENGTH_SHORT
    //         )
    //         .show();
    //     } else {
    //       Toast
    //         .makeText(
    //           getReactApplicationContext(),
    //           "Access not granted",
    //           Toast.LENGTH_SHORT
    //         )
    //         .show();
    //     }
    //   }
    // }
    if(requestCode == 2256)
    {
      Toast.makeText(  getReactApplicationContext(), "Access granted 1",Toast.LENGTH_SHORT).show();
    }else{
      Toast.makeText( getReactApplicationContext(),   "Access not granted 1",  Toast.LENGTH_SHORT ).show();
    }
    if(requestCode == 100)
    {
      Toast.makeText(  getReactApplicationContext(), "Access granted 2",Toast.LENGTH_SHORT).show();
    }else{
      Toast.makeText( getReactApplicationContext(),   "Access not granted 2",  Toast.LENGTH_SHORT ).show();
    }
  }

  @Override
  public void onNewIntent(Intent intent) {}

  @NonNull
  @Override
  public String getName() {
    return "PermissionFileModule";
  }

  @ReactMethod
  public void checkGrantPermission(Callback error, Callback success) {
    try {
      if (!checkPermission()) {
        requestPermission();
        success.invoke(false);
      } else {
        success.invoke(true);
      }
    } catch (IllegalViewOperationException e) {
      error.invoke(e.getMessage());
    }
  }

  private boolean checkPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      return Environment.isExternalStorageManager();
    } else {
      int readPermission = ContextCompat.checkSelfPermission(
        getReactApplicationContext(),
        Manifest.permission.READ_EXTERNAL_STORAGE
      );
      int writePermission = ContextCompat.checkSelfPermission(
        getReactApplicationContext(),
        Manifest.permission.WRITE_EXTERNAL_STORAGE
      );
      return (
        readPermission == PackageManager.PERMISSION_GRANTED &&
        writePermission == PackageManager.PERMISSION_GRANTED
      );
    }
  }

  private void requestPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      try {
        Intent intent = new Intent(
          Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION
        );
        intent.addCategory(Intent.CATEGORY_DEFAULT);
        intent.setData(
          Uri.parse("package:" + getReactApplicationContext().getPackageName())
        );
        getCurrentActivity().startActivityForResult(intent, 2256);
      } catch (Exception e) {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
        getCurrentActivity().startActivityForResult(intent, 2256);
      }
    } else {
      // Below Android 11
      ActivityCompat.requestPermissions(
        getCurrentActivity(),
        new String[] { Manifest.permission.WRITE_EXTERNAL_STORAGE },
        100
      );
    }
  }
  //   public MyNativeModule(ReactApplicationContext reactContext) {
  //       super(reactContext);
  //   }
  //     @Override
  //     public String getName() {
  //         return "MyNativeModule";
  //     }
  //     @ReactMethod
  //     public void getInstalledUPIApps(Promise promise) {
  //         ArrayList<String> upiList = new ArrayList<>();
  //         Uri uri = Uri.parse(String.format("%s://%s", "upi", "pay"));
  //         Intent upiUriIntent = new Intent();
  //         upiUriIntent.setData(uri);
  //         PackageManager packageManager = getReactApplicationContext().getPackageManager();
  //         List<ResolveInfo> resolveInfoList = packageManager.queryIntentActivities(upiUriIntent, PackageManager.MATCH_DEFAULT_ONLY);
  //         if (resolveInfoList != null) {
  //             for (ResolveInfo resolveInfo : resolveInfoList) {
  //                 upiList.add(resolveInfo.activityInfo.packageName);
  //             }
  //         }
  //         WritableArray result = new WritableNativeArray();
  //         result.pushString(upiList.toString());
  //         promise.resolve(result);
  //     }

  //     @ReactMethod
  // public void startActivityForResult(String action, String redirectUrl, String APP_PACKAGE, int requestCode, Promise promise) {
  //     try {
  //         Intent intent = new Intent(action);
  //         // intent.addCategory(Intent.CATEGORY_LAUNCHER);
  //         intent.setData(Uri.parse(redirectUrl));
  //         intent.setPackage(APP_PACKAGE);
  //         Activity currentActivity = getCurrentActivity();
  //         if (currentActivity == null) {
  //             promise.reject("ERROR", "Current activity is null.");
  //             return;
  //         }
  //         currentActivity.startActivityForResult(intent, requestCode);
  //         promise.resolve(true);
  //     } catch (Exception e) {
  //         promise.reject("ERROR", e.getMessage());
  //     }
  // }
}
