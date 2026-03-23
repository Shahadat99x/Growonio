import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const isSupportedLocale = routing.locales.some((value) => value === locale);
 
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !isSupportedLocale) {
    notFound();
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
