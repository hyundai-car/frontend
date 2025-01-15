
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { pathKeys } from '@/shared/lib/react-router';
import { SimpleSearchStep } from '@/shared/lib/react-router/router.types';

export function SimpleSearchPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step || 1);

  const handleNext = () => {
    if (currentStep === 5) {
      navigate(pathKeys.simpleSearch.result({ resultId: '123' }));
    } else {
      navigate(pathKeys.simpleSearch.step({ step: String(currentStep + 1).toString() as SimpleSearchStep }));  // 리터럴 타입 강제 변환
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      navigate(pathKeys.simpleSearch.step({ step: String(currentStep - 1).toString() as SimpleSearchStep }));
    }
  };

  return (
    <div>
      <Outlet />
      <div>
        {currentStep > 1 && <button onClick={handlePrev}>이전</button>}
        {<button onClick={handleNext}>{currentStep === 5 ? '결과보기' : '다음'}</button>}
      </div>
    </div>
  );
}