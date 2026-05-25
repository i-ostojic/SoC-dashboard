import styles from './Dashboard.module.css'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Mock podaci za sada
const mockReadings = [
  { time: '08:00', voltage: 3.75, temperature: 24.5 },
  { time: '09:00', voltage: 3.82, temperature: 25.1 },
  { time: '10:00', voltage: 3.69, temperature: 23.8 },
  { time: '11:00', voltage: 3.91, temperature: 26.2 },
  { time: '12:00', voltage: 3.78, temperature: 25.7 },
  { time: '13:00', voltage: 3.85, temperature: 24.9 },
  { time: '14:00', voltage: 3.72, temperature: 27.1 },
]

const sohPercentage = 85

// SOH Gauge komponenta
const SohGauge = ({ value }: { value: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = 80
  const strokeWidth = 12
  const circumference = Math.PI * radius
  const progress = (animatedValue / 100) * circumference

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value)
    }, 300)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <svg width="220" height="130" viewBox="0 0 220 130">
      {/* Pozadinski luk */}
      <path
        d={`M 20 110 A ${radius} ${radius} 0 0 1 200 110`}
        fill="none"
        stroke="var(--border)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Aktivni luk - s CSS tranzicijom */}
      <path
        d={`M 20 110 A ${radius} ${radius} 0 0 1 200 110`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${progress} ${circumference}`}
        style={{ transition: 'stroke-dasharray 1.2s ease' }}
      />
      {/* Postotak */}
      <text
        x="110"
        y="90"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="28"
        fontWeight="700"
      >
        {Math.round(animatedValue)}%
      </text>
      {/* Label */}
      <text
        x="110"
        y="115"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        State of Health
      </text>
    </svg>
  )
}

const Dashboard = () => {
  return (
    <div className={styles.page}>

      {/* Kartice */}
      <div className={styles.cardsRow}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Napon</span>
          <span className={styles.cardValue}>
            3.75 <span className={styles.cardUnit}>V</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Struja</span>
          <span className={styles.cardValue}>
            1.20 <span className={styles.cardUnit}>A</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Temperatura</span>
          <span className={styles.cardValue}>
            24.5 <span className={styles.cardUnit}>°C</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>SOH</span>
          <span className={styles.cardValue}>
            95.5 <span className={styles.cardUnit}>%</span>
          </span>
        </div>
      </div>

      {/* SOH Gauge */}
      <div className={styles.gaugeRow}>
        <div className={styles.gaugeCard}>
          <span className={styles.gaugeTitle}>State of Health</span>
          <SohGauge value={sohPercentage} />
        </div>
      </div>

      {/* Grafovi */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Graf napona</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockReadings}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              />
              <Line
                type="monotone"
                dataKey="voltage"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Graf temperature</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockReadings}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default Dashboard