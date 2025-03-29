import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AppData } from './types';

const DATA_FILE = 'appData.json';

export async function saveAppData(data: AppData): Promise<void> {
  try {
    console.log('Saving app data...', data);
    const jsonData = JSON.stringify(data, null, 2);
    await Filesystem.writeFile({
      path: DATA_FILE,
      data: jsonData,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    console.log('App data saved successfully.');
  } catch (error) {
    console.error('Error saving app data: ', error);
  }
}

export async function loadAppData(): Promise<AppData | null> {
  try {
    const result = await Filesystem.readFile({
      path: DATA_FILE,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    const data: AppData = JSON.parse(result.data as string);
    console.log('App data loaded successfully.', data);
    return data;
  } catch (error) {
    console.error('Error loading app data: ', error);
    return null;
  }
}
