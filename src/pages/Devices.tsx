import { useEffect, useState } from "react";
import { getDevices } from "../services/api";
import styles from "./Devices.module.css";

type Device = {
  id: string;
  name: string;
  serial_number: string;
  description: string;
  is_active: boolean;
  created_at: string;
};

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getDevices();
        setDevices(response.data);
      } catch (err) {
        console.error("Greška pri dohvaćanju uređaja:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", color: "var(--text-dark)" }}>
        Učitavanje...
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Uređaji</h1>
        <button className={styles.addButton}>+ Dodaj uređaj</button>
      </div>

      <div className={styles.grid}>
        {devices.map((device) => (
          <div key={device.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.deviceName}>{device.name}</span>
              <span
                className={`${styles.statusBadge} ${device.is_active ? styles.statusActive : styles.statusInactive}`}
              >
                {device.is_active ? "Aktivan" : "Neaktivan"}
              </span>
            </div>
            <span className={styles.deviceSerial}>{device.serial_number}</span>
            <span className={styles.deviceInfo}>{device.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
