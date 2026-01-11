import controller.transaction as helper
from fastapi import APIRouter, UploadFile

router=APIRouter()

@router.get('/dashboard/prediction')
def get_dashboard_pred():
    return helper.make_predictions()
@router.get('/download_prediction')
def download_result():
    return helper.download_prediction()

@router.post('/file_prediction')
async def filePred(file:UploadFile):
    return await helper.file_pred(file)