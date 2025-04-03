import {
  Filesystem,
  Directory,
  Encoding,
  FilesystemPlugin,
} from '@capacitor/filesystem';
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
    console.error(
      'Error saving app data: ',
      error instanceof Error ? error.message : error
    );
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
    if (
      error instanceof Error &&
      error.message.includes('File does not exist')
    ) {
      console.warn('App data file not found. Returning null.');
      return null;
    }
    console.error(
      'Error loading app data: ',
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export function exportAppData(
  data: AppData,
  filename = 'exportedAppData.json'
): void {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData)
    );
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // Clean up the element
    console.log('App data exported successfully.');
  } catch (error) {
    console.error(
      'Error exporting app data: ',
      error instanceof Error ? error.message : error
    );
  }
}

export async function importAppData(file: File): Promise<AppData | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = event.target?.result as string;
        const data: AppData = JSON.parse(jsonData);

        console.log('App data imported successfully.', data);
        resolve(data);
      } catch (error) {
        console.error(
          'Error parsing imported data: ',
          error instanceof Error ? error.message : error
        );
        reject(error);
        resolve(null);
      }
    };

    reader.onerror = (error) => {
      console.error(
        'Error reading imported file: ',
        error instanceof Error ? error.message : error
      );
      reject(error);
      resolve(null);
    };

    reader.readAsText(file);
  });
}

export async function clearAppData(): Promise<void> {
  try {
    saveAppData({
      exercises: [],
      workouts: [],
      completedWorkouts: [],
    });
    console.log('App data cleared successfully.');
  } catch (error) {
    console.error(
      'Error clearing app data: ',
      error instanceof Error ? error.message : error
    );
  }
}
