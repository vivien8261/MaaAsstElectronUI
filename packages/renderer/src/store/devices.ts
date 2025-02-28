import { defineStore } from "pinia";

export interface DeviceState {
  devices: Device[];
  lastUpdate: number | null;
}

export interface DeviceAction {
  mergeSearchResult(devices: NativeDevice[]): void;
  updateDeviceStatus(uuid: string, status: DeviceStatus): void;
  removeNotInUseDevice(): void;
  updateDeviceUuid(oldUuid: string, newUuid:string): void;
}

// Demo only
// const lastUpdateDemo = Date.now();
// const allStatus: DeviceStatus[] = [
//   "available",
//   "connecting",
//   "connected",
//   "disconnected",
//   "tasking",
//   "unknown",
// ];
// const devicesDemo: Device[] = [
  // {
  //   uuid: "12345678-90abcdefg",
  //   connectionString: "127.0.0.1:5555",
  //   name: "bluestack",
  //   status: "tasking",
  //   adbPath: "E://adb.exe",
  // },
//   ...allStatus.map((v) => ({
//     uuid: v,
//     connectionString: v,
//     name: "bluestack" as EmulatorName,
//     status: v,
//     adbPath: v,
//   })),
// ];

const useDeviceStore = defineStore<"device", DeviceState, {}, DeviceAction>(
  "device",
  {
    state: () => {
      return {
        devices: [],
        lastUpdate: null,
      };
    },
    actions: {
      mergeSearchResult(devices) {
        this.lastUpdate = Date.now();
        for (const device of devices) {
          const origin = this.devices.find((dev) => dev.uuid === device.uuid);
          if (!origin) {
            this.devices.push({
              status: "available",
              ...device,
            });
          }
        }
      },
      updateDeviceStatus(uuid, status) {
        const origin = this.devices.find((dev) => dev.uuid === uuid);
        if (origin) {
          origin.status = status;
        }
      },
      removeNotInUseDevice() {
        this.devices.forEach((v)=> v.status = "connected");
      },
      updateDeviceUuid(oldUuid,newUuid){
        console.log(`old uuid: ${oldUuid}`);
        const origin = this.devices.find((dev)=>dev.uuid === oldUuid );
        console.log(`new uuid: ${newUuid}`);
        if(origin)
        {
          origin.uuid = newUuid;
        }
      }
    },
  }
);

export default useDeviceStore;
