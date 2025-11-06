import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const areaData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 }
];

const pieData = [
  { name: 'America', value: 400, color: '#0088FE' },
  { name: 'Asia', value: 300, color: '#00C49F' },
  { name: 'Europe', value: 300, color: '#FFBB28' },
  { name: 'Africa', value: 200, color: '#FF8042' }
];

const barData = [
  { name: 'Italy', value: 400 },
  { name: 'Japan', value: 300 },
  { name: 'China', value: 200 }
];

const radarData = [
  { subject: 'English', A: 120, fullMark: 150 },
  { subject: 'History', A: 98, fullMark: 150 },
  { subject: 'Physics', A: 86, fullMark: 150 },
  { subject: 'Math', A: 99, fullMark: 150 }
];

export function WebsiteVisits() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Website Visits (+43% than last year)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CurrentVisits() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Visits
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ConversionRates() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Conversion Rates
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CurrentSubject() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Subject
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}