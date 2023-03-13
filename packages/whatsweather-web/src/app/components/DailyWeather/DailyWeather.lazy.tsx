import React, { lazy, Suspense } from 'react';

const LazyDailyWeather = lazy(() => import('./DailyWeather'));

interface DailyWeatherProps {
  date: string,
  maxtemp_c: number,
  mintemp_c: number,
  condition: {text: string, icon: string}
}

const DailyWeather = (props: DailyWeatherProps & JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDailyWeather {...props} />
  </Suspense>
);

export default DailyWeather;
