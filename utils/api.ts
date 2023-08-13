import HttpStatus from '@/constants/httpStatusCodes';

interface ApiResponse<ReturnedType> {
  status: number;
  data: { message?: string; result?: ReturnedType };
}

export default async function handleAsyncThunk<ReturnedType>(
  thunkAPI: any,
  apiFunction: () => Promise<ApiResponse<ReturnedType>>
) {
  try {
    const response = await apiFunction();

    if (response.status in [HttpStatus.OK, HttpStatus.CREATED, HttpStatus.NO_CONTENT]) {
      return thunkAPI.rejectWithValue(response.data.message);
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
}
