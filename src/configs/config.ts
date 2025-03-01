import { PlatformConfig } from 'homebridge';
import { PLATFORM_NAME } from '../settings';
import { CalendarConfig, ICalendarConfig } from './calendar.config';

export interface IConfig extends PlatformConfig {
  debug?: boolean;
  caseInsensitiveEventsMatching?: boolean;
  calendars?: ICalendarConfig[];
}

export const CONFIG_DEFAULT: IConfig = {
  platform: PLATFORM_NAME,
  caseInsensitiveEventsMatching: false,
};

export class Config implements IConfig {
  readonly platform: string;
  readonly debug: boolean;
  readonly caseInsensitiveEventsMatching: boolean;
  readonly calendars: CalendarConfig[];

  constructor(config: IConfig = CONFIG_DEFAULT) {
    this.platform = config.platform;
    this.debug = !!config.debug;
    this.caseInsensitiveEventsMatching = config.caseInsensitiveEventsMatching || false;
    this.calendars = (config.calendars || [])
      .map((calendar) => {
        return new CalendarConfig(this, calendar);
      });
  }
}
