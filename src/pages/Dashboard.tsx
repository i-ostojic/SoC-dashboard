import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { getReadings } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tip za jedno očitanje
type Reading = {
  id: string;
  device_id: string;
  voltage: number;
  current: number;
  temperature: number;
  recorded_at: string;
  created_at: string;
};

// SOH Gauge - mora biti IZVAN Dashboard komponente
const SohGauge = ({ value }: { value: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = 80;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;
  const progress = (animatedValue / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <svg width="220" height="130" viewBox="0 0 220 130">
      <path
        d={`M 20 110 A ${radius} ${radius} 0 0 1 200 110`}
        fill="none"
        stroke="var(--border)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`M 20 110 A ${radius} ${radius} 0 0 1 200 110`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${progress} ${circumference}`}
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
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
  );
};

// Dashboard komponenta
const Dashboard = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const sohPercentage = 85;

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const response = await getReadings();
        setReadings(response.data);
      } catch (err) {
        console.error("Greška pri dohvaćanju podataka:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReadings();
  }, []);

  const latest = readings[readings.length - 1];

  if (loading) {
    return (
      <div style={{ padding: "2rem", color: "var(--text-dark)" }}>
        Učitavanje...
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.cardsRow}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Napon</span>
          <span className={styles.cardValue}>
            {latest?.voltage ?? "-"} <span className={styles.cardUnit}>V</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Struja</span>
          <span className={styles.cardValue}>
            {latest?.current ?? "-"} <span className={styles.cardUnit}>A</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Temperatura</span>
          <span className={styles.cardValue}>
            {latest?.temperature ?? "-"}{" "}
            <span className={styles.cardUnit}>°C</span>
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>SOH</span>
          <span className={styles.cardValue}>
            95.5 <span className={styles.cardUnit}>%</span>
          </span>
        </div>
      </div>

      <div className={styles.gaugeRow}>
        <div className={styles.gaugeCard}>
          <span className={styles.gaugeTitle}>State of Health</span>
          <SohGauge value={sohPercentage} />
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Graf napona</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={readings}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="recorded_at"
                stroke="var(--text-secondary)"
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
                }}
              />
              <YAxis
                stroke="var(--text-secondary)"
                fontSize={12}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  color: "var(--text-primary)",
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
            <LineChart data={readings}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="recorded_at"
                stroke="var(--text-secondary)"
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
                }}
              />
              <YAxis
                stroke="var(--text-secondary)"
                fontSize={12}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  color: "var(--text-primary)",
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
  );
};

export default Dashboard;
