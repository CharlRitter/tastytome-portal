import { AxiosResponse } from '@/api/axios';

export default async function handleAsyncThunk<ReturnedType>(
  thunkAPI: any,
  apiFunction: () => Promise<AxiosResponse<ReturnedType>>
): Promise<ReturnedType> {
  try {
    const response = await apiFunction();

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || 'Something went wrong');
  }
}
