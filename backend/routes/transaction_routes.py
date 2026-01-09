from controller.transaction import make_predictions
from fastapi import APIRouter

router=APIRouter()

@router.get('/dashboard/prediction')
def get_dashboard_pred():
    return make_predictions()