import styles from './Devices.module.css'

// Mock podaci za sada
const mockDevices = [
  {
    id: '1',
    name: 'Arduino-1',
    serial_number: 'SN-001',
    description: 'Testni Arduino uređaj',
    is_active: true,
  },
  {
    id: '2',
    name: 'Arduino-2',
    serial_number: 'SN-002',
    description: 'Drugi uređaj',
    is_active: false,
  },
  {
    id: '3',
    name: 'ESP32-1',
    serial_number: 'SN-003',
    description: 'ESP32 uređaj',
    is_active: true,
  },
]

const Devices = () => {
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Uređaji</h1>
        <button className={styles.addButton}>+ Dodaj uređaj</button>
      </div>

      {/* Grid uređaja */}
      <div className={styles.grid}>
        {mockDevices.map((device) => (
          <div key={device.id} className={styles.card}>
            
            <div className={styles.cardHeader}>
              <span className={styles.deviceName}>{device.name}</span>
              <span className={`${styles.statusBadge} ${device.is_active ? styles.statusActive : styles.statusInactive}`}>
                {device.is_active ? 'Aktivan' : 'Neaktivan'}
              </span>
            </div>

            <span className={styles.deviceSerial}>{device.serial_number}</span>
            <span className={styles.deviceInfo}>{device.description}</span>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Devices