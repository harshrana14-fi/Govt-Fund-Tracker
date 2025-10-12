# GovSpend Tracker

A civic-tech web application that visualizes government fund flow from allocation → release → expenditure, flags anomalies, and allows citizens to file complaints or RTI requests.

## 🚀 Features

- **Dashboard**: Visual overview of government spending with interactive charts
- **Project Tracking**: Detailed view of all government projects with search and filtering
- **Anomaly Detection**: Automated detection of irregularities in fund flow
- **Complaint Helper**: RTI and CPGRAMS complaint templates
- **Responsive Design**: Mobile-friendly interface
- **Real-time Data**: Mock API with realistic government project data

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Fetching**: Axios

## 📊 Anomaly Detection Rules

The system automatically flags projects based on these criteria:

1. **Low Fund Release**: Released amount < 80% of sanctioned amount
2. **Low Expenditure**: Spent amount < 70% of released amount
3. **Over Expenditure**: Spent amount > released amount
4. **High Value Low Progress**: Projects > ₹2Cr with < 30% fund release
5. **Vendor Concentration**: Same vendor getting multiple contracts

## 🏗 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── projects/page.tsx     # Projects listing
│   ├── anomalies/page.tsx    # Anomalies view
│   ├── report/page.tsx       # Complaint helper
│   └── api/projects/route.ts # Mock API
├── components/
│   ├── Navbar.tsx            # Navigation
│   └── charts/               # Chart components
├── data/
│   └── projects.json         # Mock data
└── lib/
    └── anomalies.ts          # Anomaly detection logic
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
```bash
npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### Dashboard (`/`)
- Fund flow visualization with Recharts
- Summary cards showing key metrics
- Anomaly statistics

### Projects (`/projects`)
- Sortable and searchable project table
- Filter by status
- Progress indicators

### Anomalies (`/anomalies`)
- Flagged irregularities with severity levels
- Filter by type and severity
- Detailed descriptions

### Report (`/report`)
- RTI application template
- CPGRAMS complaint template
- Copy to clipboard functionality

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection
- **Smooth Animations**: Framer Motion transitions
- **Interactive Charts**: Hover tooltips and legends
- **Search & Filter**: Real-time filtering across all pages

## 📊 Sample Data

The app includes realistic mock data for 8 government projects across different states and departments, including:

- Rural Road Development (Bihar)
- Clean Water Supply (Maharashtra)
- Digital Infrastructure (Karnataka)
- Healthcare Centers (Tamil Nadu)
- Solar Power Plant (Rajasthan)
- School Infrastructure (Uttar Pradesh)
- Waste Management (Gujarat)
- Flood Control System (Assam)

## 🔧 Customization

### Adding New Anomaly Rules

Edit `src/lib/anomalies.ts` to add new detection rules:

```typescript
// Example: Detect projects with no progress for 6+ months
if (isProjectStalled(project)) {
  anomalies.push({
    // ... anomaly details
  });
}
```

### Modifying Mock Data

Update `src/data/projects.json` to add more projects or modify existing ones.

### Styling Changes

The app uses TailwindCSS with shadcn/ui components. Modify `src/app/globals.css` for global styles.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built for civic engagement and government transparency
- Inspired by the need for better public oversight of government spending
- Uses open-source technologies and follows best practices

---

**Note**: This is a demonstration application with mock data. For production use, integrate with real government APIs and databases.