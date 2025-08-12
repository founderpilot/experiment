# Banana Pro - Crypto Trading Dashboard

A modern, responsive crypto trading dashboard built with React and Bootstrap-inspired components.

## ✨ New Features

### 🎨 Edit Layout Mode
- **Edit Layout Button**: Added to each template in the template selector for quick access
- **Visual Indicators**: Clear visual feedback when hovering over draggable widgets
- **Drag & Drop**: Intuitive cursor changes (grab/grabbing) for widget repositioning
- **Resize Handles**: Enhanced resize handles with visual feedback
- **Edit Mode Hint**: Helpful tooltip showing available actions

### 🖼️ Enhanced Widget Previews
- **Visual Previews**: Each widget now shows a preview with hover effects
- **Interactive Elements**: Hover overlays with add widget buttons
- **Category Badges**: Color-coded categories for easy identification
- **Responsive Design**: Optimized for both desktop and mobile

### 🚀 Popular Widgets Category
- **New "Popular" Category**: Features the most essential widgets (Watchlist, Chart, Positions)
- **Enhanced Visual Treatment**: Special styling and animations for popular widgets
- **Floating Particles**: Dynamic particle effects for popular widget cards
- **Priority Placement**: Popular widgets are highlighted and easier to find

### 🎯 Super Dynamic Interactions
- **Smooth Animations**: 60fps animations with cubic-bezier easing curves
- **Hover Effects**: Rich hover states with transforms, shadows, and color changes
- **Micro-interactions**: Subtle animations for buttons, icons, and form elements
- **Buffer Effects**: Smooth transitions and visual feedback throughout
- **Responsive Animations**: Optimized animations for different screen sizes

### 🎨 Visual Enhancements
- **Enhanced Cursors**: Dynamic cursor changes for different interactions
- **Gradient Overlays**: Beautiful gradient effects on hover and focus
- **Shadow Systems**: Layered shadow effects for depth and hierarchy
- **Color Transitions**: Smooth color transitions with yellow accent theme
- **Particle Effects**: Floating particles and shimmer animations

### 🎯 Improved User Experience
- **Template Selection**: Easy template switching with edit layout options
- **Visual Feedback**: Hover effects and animations throughout the interface
- **Mobile Optimization**: Responsive design with touch-friendly controls
- **Accessibility**: Clear visual indicators and intuitive interactions
- **Performance**: Optimized animations with hardware acceleration

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

### Template Selection
1. Click the "Templates" button in the header
2. Choose from Beginner, Intermediate, or Advanced layouts
3. Use "Edit Layout" to immediately enter edit mode with that template

### Edit Mode
1. Click the "Edit Layout" button (yellow plus icon)
2. Drag widgets to reposition them
3. Resize widgets using the bottom-right corner handles
4. Add new widgets using the green "+" button
5. Save your layout or reset to defaults

### Widget Management
1. Hover over widgets to see visual indicators
2. Use the widget selector to add new widgets
3. Each widget shows a preview and description
4. Categories help organize different widget types

## 🛠️ Technical Features

- **React Grid Layout**: Responsive grid system for widget positioning
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Beautiful, customizable icons
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Local Storage**: Layout persistence across sessions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (xs, xxs layouts)
- **Tablet**: 768px - 1024px (sm, md layouts)
- **Desktop**: > 1024px (lg layout)

## 🎨 Customization

The dashboard uses CSS custom properties for theming:
- Primary color: Yellow (#FFD700)
- Background: Dark theme with subtle gradients
- Accent colors: Category-specific color coding

## 🔧 Development

### File Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── TemplateSelector.jsx
│   ├── WidgetSelector.jsx
│   └── TradingDashboard.jsx
├── data/               # Mock data and configurations
├── hooks/              # Custom React hooks
└── styles/             # CSS and styling
```

### Key Components
- **TradingDashboard**: Main dashboard with grid layout
- **TemplateSelector**: Template selection modal
- **WidgetSelector**: Widget library and management
- **AllWidgets**: Individual widget implementations

## 🚀 Future Enhancements

- [ ] Real-time data integration
- [ ] Advanced charting capabilities
- [ ] User authentication and profiles
- [ ] Custom widget creation
- [ ] Theme customization
- [ ] Export/import layouts
- [ ] Collaborative features

## 📄 License

This project is licensed under the MIT License.
