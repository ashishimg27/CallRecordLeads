package com.call_recording_leads;
import androidx.annotation.NonNull;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.call_recording_leads.PermissionFileModule;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PermissionFilePackage implements ReactPackage {

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(
   @NonNull ReactApplicationContext reactContext
  ) {
    return Collections.emptyList();
  }

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(
   @NonNull ReactApplicationContext reactContext
  ) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new PermissionFileModule(reactContext));
    return modules;
  }
}
