/* Chapter-level mastery notes and in-lesson visual guides. */
(() => {
  const S = String.raw;
  const chapters = window.CHAPTERS || [];
  const media = window.MEDIA || [];
  const visuals = window.VISUALS || [];

  const chapter = (id) => chapters.find(item => item.id === id);

  function addSection(chapterId, section, { minutes = 0, keywords = [], objectives = [] } = {}) {
    const target = chapter(chapterId);
    if (!target) return;
    target.sections.push(section);
    target.minutes += minutes;
    target.keywords = [...new Set([...target.keywords, ...keywords])];
    target.objectives = [...new Set([...target.objectives, ...objectives])];
  }

  media.push(
    {
      id: "ai-overview-video",
      type: "VIDEO · CONCEPT MAP",
      title: "What Is Artificial Intelligence? Crash Course AI #1",
      creator: "CrashCourse",
      videoId: "a0_lo_GDcFw",
      href: "https://www.youtube.com/watch?v=a0_lo_GDcFw",
      chapter: "01",
      takeaway: "영상의 사례를 규칙·탐색·학습 중 어느 접근으로 구현할지 구분하며 보세요."
    },
    {
      id: "knn-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "K-nearest neighbors, Clearly Explained",
      creator: "StatQuest with Josh Starmer",
      videoId: "HVXime0nQeI",
      href: "https://www.youtube.com/watch?v=HVXime0nQeI",
      chapter: "02",
      takeaway: "새 점에서 이웃까지의 거리, k에 따른 투표 변화, 결정 경계의 매끄러움을 추적하세요."
    },
    {
      id: "cross-validation-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "Machine Learning Fundamentals: Cross Validation",
      creator: "StatQuest with Josh Starmer",
      videoId: "fSytzGwwBVw",
      href: "https://www.youtube.com/watch?v=fSytzGwwBVw",
      chapter: "03",
      takeaway: "각 폴드에서 전처리와 모델이 어디에 fit되고 어떤 표본이 검증에 쓰이는지 표시해 보세요."
    },
    {
      id: "linear-regression-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "Linear Regression, Clearly Explained",
      creator: "StatQuest with Josh Starmer",
      videoId: "nk2CQITm_eo",
      href: "https://www.youtube.com/watch?v=nk2CQITm_eo",
      chapter: "04",
      takeaway: "직선의 기울기보다 잔차 제곱합이 어떻게 최적 계수를 정하는지에 집중하세요."
    },
    {
      id: "logistic-regression-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "Logistic Regression",
      creator: "StatQuest with Josh Starmer",
      videoId: "yIYKR4sgzI8",
      href: "https://www.youtube.com/watch?v=yIYKR4sgzI8",
      chapter: "05",
      takeaway: "선형 점수, 로짓, 확률, 임곗값이 서로 다른 네 단계라는 점을 연결하세요."
    },
    {
      id: "decision-tree-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "Decision Trees",
      creator: "StatQuest with Josh Starmer",
      videoId: "7VeUPuFGJHk",
      href: "https://www.youtube.com/watch?v=7VeUPuFGJHk",
      chapter: "06",
      takeaway: "각 질문이 불순도를 얼마나 줄이는지와 깊어진 트리가 왜 표본을 외우는지 확인하세요."
    },
    {
      id: "kmeans-video",
      type: "VIDEO · VISUAL GUIDE",
      title: "K-means clustering",
      creator: "StatQuest with Josh Starmer",
      videoId: "4b5d3muPQmA",
      href: "https://www.youtube.com/watch?v=4b5d3muPQmA",
      chapter: "07",
      takeaway: "할당과 중심 갱신이 번갈아 일어나는 두 단계를 사이트의 인터랙티브 실험과 비교하세요."
    },
    {
      id: "pca-video",
      type: "VIDEO · STEP BY STEP",
      title: "Principal Component Analysis (PCA), Step-by-Step",
      creator: "StatQuest with Josh Starmer",
      videoId: "FgakZw6K1QQ",
      href: "https://www.youtube.com/watch?v=FgakZw6K1QQ",
      chapter: "07",
      takeaway: "중심화, 최대 분산 축, 투영 점수, 설명 분산이 한 계산의 어느 단계인지 구분하세요."
    }
  );

  visuals.push(
    {
      id: "ai-system-map",
      kind: "CONCEPT MAP · ORIGINAL SVG",
      chapter: "01",
      title: "AI의 범위와 과업을 한 장에",
      description: "AI·ML·딥러닝은 포함 관계이고, 생성·분류·추천은 시스템이 수행하는 과업이라는 두 축을 분리합니다.",
      src: "assets/visuals/ai-system-map.svg",
      alt: "AI 안에 규칙과 탐색, 머신러닝이 있고 머신러닝 안에 딥러닝이 있는 관계도",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://www.ibm.com/think/topics/artificial-intelligence"
    },
    {
      id: "knn-distance",
      kind: "ALGORITHM · ORIGINAL SVG",
      chapter: "02",
      title: "이웃은 좌표가 아니라 거리로 정해진다",
      description: "새 표본의 최근접 이웃과 표준화의 역할을 동시에 보며 K-NN 예측을 손으로 추적합니다.",
      src: "assets/visuals/knn-distance.svg",
      alt: "두 클래스 점과 새 점의 세 최근접 이웃, 표준화된 거리의 의미를 나타낸 산점도",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/neighbors.html"
    },
    {
      id: "validation-pipeline",
      kind: "WORKFLOW · ORIGINAL SVG",
      chapter: "03",
      title: "fit과 transform의 경계를 시각화",
      description: "훈련에서만 통계를 학습하고 검증·테스트에는 같은 변환을 적용해야 누출이 생기지 않습니다.",
      src: "assets/visuals/validation-pipeline.svg",
      alt: "원본 데이터를 훈련 검증 테스트로 나누고 훈련에서만 전처리를 학습하는 파이프라인",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/cross_validation.html"
    },
    {
      id: "regression-residuals",
      kind: "DIAGNOSTIC · ORIGINAL SVG",
      chapter: "04",
      title: "회귀선 뒤에 남는 잔차의 패턴",
      description: "잔차가 0 주위에 무작위로 흩어지는지, 곡선이나 부채꼴 패턴이 남는지 비교합니다.",
      src: "assets/visuals/regression-residuals.svg",
      alt: "회귀선까지의 잔차와 좋은 잔차 및 패턴이 남은 잔차를 비교한 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/linear_model.html"
    },
    {
      id: "classification-threshold",
      kind: "DECISION · ORIGINAL SVG",
      chapter: "05",
      title: "점수에서 확률, 확률에서 결정으로",
      description: "시그모이드 확률과 임곗값을 분리해 정밀도·재현율의 변화를 읽습니다.",
      src: "assets/visuals/classification-threshold.svg",
      alt: "시그모이드 곡선과 분류 임곗값 변화에 따른 정밀도 재현율 관계",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"
    },
    {
      id: "tree-ensemble",
      kind: "ENSEMBLE · ORIGINAL SVG",
      chapter: "06",
      title: "서로 다른 트리의 오차를 결합하기",
      description: "표본과 특성을 달리 본 트리의 예측을 평균·투표해 분산을 줄이는 흐름입니다.",
      src: "assets/visuals/tree-ensemble.svg",
      alt: "데이터에서 여러 트리를 만들고 예측을 평균하거나 투표하는 앙상블 흐름",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/ensemble.html"
    },
    {
      id: "kmeans-pca",
      kind: "UNSUPERVISED · ORIGINAL SVG",
      chapter: "07",
      title: "군집과 투영은 서로 다른 질문이다",
      description: "K-평균은 가까운 중심을, PCA는 분산이 큰 직교 축을 찾는다는 차이를 나란히 봅니다.",
      src: "assets/visuals/kmeans-pca.svg",
      alt: "K-평균 중심 할당과 PCA 최대 분산 축을 나란히 표현한 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/decomposition.html#pca"
    }
  );

  addSection("01-ai-map", {
    id: "system-boundary-mastery",
    kicker: "09 · MASTERY NOTE",
    title: "멋진 모델보다 먼저 시스템의 경계를 그린다",
    body: S`
      <p>현실의 문제를 바로 “분류 문제”라고 부르면 중요한 결정이 빠집니다. 먼저 <strong>누가</strong> 모델 출력을 보고, <strong>언제</strong> 어떤 행동을 하며, 잘못된 행동의 비용이 무엇인지 적어야 합니다. 같은 질병 확률도 의사의 2차 검사를 돕는 도구와 자동으로 치료를 결정하는 시스템은 요구되는 안전성이 다릅니다.</p>
      <ol>
        <li><strong>관측 단위:</strong> 한 표본이 사람, 거래, 이미지, 시간 구간 중 무엇인지 정합니다.</li>
        <li><strong>예측 시점:</strong> 추론 순간에 실제로 알 수 있는 특성만 남깁니다.</li>
        <li><strong>행동과 비용:</strong> 거짓 양성·거짓 음성이 사용자에게 만드는 결과를 적습니다.</li>
        <li><strong>기준선:</strong> 다수 클래스, 평균 예측, 간단한 규칙이 이미 달성하는 성능을 계산합니다.</li>
        <li><strong>피드백:</strong> 배포 뒤 정답을 언제 얻고, 분포 변화를 어떻게 감시할지 정합니다.</li>
      </ol>
      <div class="worked-example"><span>SYSTEM EXAMPLE</span><h3>스팸 분류기의 출력은 끝이 아니다</h3><p>모델은 스팸 점수를 만들고, 메일 서비스는 임곗값을 정해 차단·스팸함 이동·경고 중 하나를 선택합니다. 중요한 메일을 잃는 비용이 크다면 자동 삭제보다 사람이 복구할 수 있는 스팸함이 안전합니다. 이처럼 모델의 정확도와 전체 시스템의 품질은 같지 않습니다.</p></div>
      <p>AI 프로젝트의 최소 문장은 “입력 \(x\)로 타깃 \(y\)를 예측한다”가 아니라 “시점 \(t\)에 사용할 수 있는 \(x\)로 \(y\)의 점수를 만들어 사용자 \(u\)의 결정 \(a\)를 돕고, 비용 \(C(a,y)\)를 줄인다”입니다. 이 문장을 쓰면 필요한 데이터 분할과 지표가 자연스럽게 따라옵니다.</p>
    `,
    visuals: ["ai-system-map"],
    videos: ["ai-overview-video"]
  }, {
    minutes: 18,
    keywords: ["시스템 경계", "관측 단위", "예측 시점", "기준선", "행동 비용"],
    objectives: ["모델 출력이 실제 사용자 행동으로 이어지는 전체 시스템 경계를 정의한다."]
  });

  addSection("02-ml-knn", {
    id: "knn-prediction-trace",
    kicker: "11 · MASTERY NOTE",
    title: "K-NN 예측 한 건을 거리 계산부터 검증한다",
    body: S`
      <p>훈련이 끝난 K-NN은 새로운 계수를 갖지 않습니다. 예측할 때 새 표본 \(x_*\)와 모든 훈련 표본 사이의 거리를 계산하고, 가장 작은 \(k\)개를 선택해 분류는 투표, 회귀는 평균을 냅니다. 그래서 학습은 가볍지만 예측 비용은 훈련 표본 수와 특성 수가 커질수록 증가합니다.</p>
      <p>길이와 무게를 그대로 사용하면 수백 단위인 무게 차이가 수십 단위인 길이 차이를 압도합니다. 표준화한 값 \(z_j=(x_j-\mu_j)/s_j\)는 각 차이를 “훈련 표준편차 몇 개”라는 공통 단위로 바꿉니다. 평균과 표준편차는 반드시 훈련 데이터에서만 구합니다.</p>
      <table class="comparison-table">
        <thead><tr><th>확인 질문</th><th>실패 신호</th><th>다음 행동</th></tr></thead>
        <tbody>
          <tr><td>이웃이 정말 가까운가?</td><td>모든 거리가 비슷하거나 매우 큼</td><td>스케일·불필요한 특성·차원을 점검</td></tr>
          <tr><td>k가 안정적인가?</td><td>k를 1만 바꿔도 예측이 뒤집힘</td><td>교차검증으로 여러 k를 비교</td></tr>
          <tr><td>클래스가 균형적인가?</td><td>이웃 대부분이 다수 클래스</td><td>계층 분할과 클래스별 지표 확인</td></tr>
          <tr><td>확률이 충분히 세밀한가?</td><td>k=3이면 0, 1/3, 2/3, 1뿐</td><td>확률 해상도와 calibration 한계 인식</td></tr>
        </tbody>
      </table>
    `,
    equation: {
      label: "표준화된 유클리드 거리",
      tex: S`d(x_*,x_i)=\sqrt{\sum_{j=1}^{p}\left(\frac{x_{*j}-\mu_j}{s_j}-\frac{x_{ij}-\mu_j}{s_j}\right)^2}`,
      note: "같은 훈련 평균 μ와 표준편차 s를 새 표본과 훈련 표본 모두에 적용합니다."
    },
    afterBody: S`
      <p>동률이 가능한 짝수 k, 결측값, 범주형 특성을 임의의 숫자로 바꾼 경우도 주의합니다. 예측이 이상하면 <code>kneighbors</code>로 인덱스·거리·라벨을 직접 출력하는 것이 가장 빠른 디버깅 방법입니다.</p>
    `,
    visuals: ["knn-distance"],
    videos: ["knn-video"]
  }, {
    minutes: 20,
    keywords: ["예측 추적", "거리 진단", "확률 해상도", "동률"],
    objectives: ["K-NN 예측 한 건을 스케일링·거리·이웃·투표 순으로 검증한다."]
  });

  addSection("03-data", {
    id: "split-strategy-mastery",
    kicker: "13 · MASTERY NOTE",
    title: "무작위 분할이 항상 공정한 것은 아니다",
    body: S`
      <p>분할의 목적은 데이터 일부를 숨기는 것이 아니라 <strong>배포 환경에서 만날 새 표본</strong>을 모사하는 것입니다. 따라서 행을 무작위로 섞는 방식은 각 행이 독립이고 미래와 과거의 분포가 비슷할 때만 자연스럽습니다.</p>
      <table class="comparison-table">
        <thead><tr><th>데이터 구조</th><th>권장 분할</th><th>막아야 하는 누출</th></tr></thead>
        <tbody>
          <tr><td>일반적인 독립 표본</td><td>무작위 + 클래스 계층 분할</td><td>클래스 비율의 우연한 차이</td></tr>
          <tr><td>한 사람의 여러 기록</td><td>사람 ID 기준 Group split</td><td>같은 사람을 훈련과 평가에서 동시에 봄</td></tr>
          <tr><td>시간 순서가 있는 로그</td><td>과거 훈련 → 미래 검증</td><td>미래 통계나 사건을 과거 예측에 사용</td></tr>
          <tr><td>증강한 이미지</td><td>원본을 먼저 분할한 뒤 훈련만 증강</td><td>거의 같은 변형본이 양쪽에 존재</td></tr>
          <tr><td>공간·기관별 데이터</td><td>지역·기관 단위 홀드아웃</td><td>장비·배경 특성을 정답 대신 학습</td></tr>
        </tbody>
      </table>
      <p>결측 대치, 스케일링, 특성 선택, PCA뿐 아니라 타깃 평균 인코딩과 데이터 기반 이상치 제거도 학습 과정입니다. 이들은 각 교차검증 훈련 폴드에서 새로 <code>fit</code>해야 합니다. Pipeline은 이 경계를 코드 구조로 강제합니다.</p>
      <div class="callout warning"><span class="callout-icon">!</span><div><strong>중복은 분할 전에 찾습니다.</strong><p>동일하거나 거의 같은 표본이 양쪽에 있으면 모델이 일반화한 것이 아니라 이미 본 표본을 다시 맞힐 수 있습니다. 이미지 해시, ID, 시간·위치 정보를 이용해 중복 단위를 정의하세요.</p></div></div>
    `,
    visuals: ["validation-pipeline"],
    videos: ["cross-validation-video"]
  }, {
    minutes: 22,
    keywords: ["Group split", "시간 분할", "중복 누출", "공간 홀드아웃"],
    objectives: ["표본의 의존 구조와 배포 시점을 반영한 데이터 분할 전략을 선택한다."]
  });

  addSection("04-regression", {
    id: "residual-diagnostics-mastery",
    kicker: "11 · MASTERY NOTE",
    title: "평균 점수 하나 대신 잔차가 남긴 구조를 읽는다",
    body: S`
      <p>회귀 오차 \(e_i=y_i-\hat y_i\)를 입력, 예측값, 시간 순서에 대해 그리면 모델이 놓친 구조가 보입니다. 좋은 모델이라고 잔차가 완벽히 무작위일 필요는 없지만, 반복되는 패턴은 현재 특성이나 함수 형태가 충분하지 않다는 증거입니다.</p>
      <table class="comparison-table">
        <thead><tr><th>잔차 모양</th><th>가능한 원인</th><th>검토할 방법</th></tr></thead>
        <tbody>
          <tr><td>U자 또는 S자 곡선</td><td>비선형 관계를 직선으로 근사</td><td>다항 특성, 변환, 트리 모델</td></tr>
          <tr><td>값이 클수록 퍼짐</td><td>분산이 일정하지 않음</td><td>로그 타깃, 가중 손실, 구간별 평가</td></tr>
          <tr><td>시간에 따라 같은 부호</td><td>추세·계절성·분포 변화 누락</td><td>시간 특성, 시계열 분할</td></tr>
          <tr><td>일부 점만 매우 큼</td><td>이상치·측정 오류·희귀 집단</td><td>원본 확인, MAE/Huber, 집단별 분석</td></tr>
        </tbody>
      </table>
      <p>\(R^2\)는 평균 예측에 비해 얼마나 오차를 줄였는지 보여 주지만 오차의 실제 단위를 말하지 않습니다. MAE 120g은 “평균적으로 약 120g 벗어난다”는 직접적인 해석이 있고, RMSE는 큰 오차에 더 큰 벌을 줍니다. 업무 비용에 가까운 지표를 주 지표로 선택하세요.</p>
    `,
    equation: {
      label: "잔차와 결정계수",
      tex: S`e_i=y_i-\hat y_i,\qquad R^2=1-\frac{\sum_i e_i^2}{\sum_i(y_i-\bar y)^2}`,
      note: "R²가 음수라면 평가 데이터에서 단순 평균 예측보다도 제곱 오차가 큽니다."
    },
    visuals: ["regression-residuals"],
    videos: ["linear-regression-video"]
  }, {
    minutes: 20,
    keywords: ["잔차도", "이분산성", "Huber", "구간별 평가"],
    objectives: ["잔차 패턴으로 비선형성·이분산성·시간 변화·이상치를 진단한다."]
  });

  addSection("05-classification", {
    id: "score-probability-decision",
    kicker: "13 · MASTERY NOTE",
    title: "클래스 예측 앞의 세 층: 점수, 확률, 결정",
    body: S`
      <p>분류 모델의 출력은 한 번에 클래스가 되지 않습니다. 로지스틱 회귀는 먼저 선형 점수 \(z=w^\top x+b\)를 만들고, 시그모이드나 softmax가 이를 확률 형태로 바꾼 뒤, 임곗값 또는 최대 확률 규칙이 행동을 정합니다. 이 세 층을 분리하면 모델을 다시 학습하지 않고도 운영 정책을 조정할 수 있습니다.</p>
      <p><strong>순위가 좋은 모델</strong>도 확률이 실제 빈도와 맞지 않을 수 있습니다. 예측 확률 0.8인 표본을 모았을 때 약 80%가 실제 양성이면 calibration이 좋다고 말합니다. 보험료나 위험 비용처럼 확률 크기 자체가 중요한 문제에서는 정확도와 함께 calibration curve와 Brier score를 봅니다.</p>
      <div class="worked-example"><span>1000 CASES</span><h3>양성률 1%에서 정확도 99%의 함정</h3><p>실제 양성 10건, 음성 990건일 때 모두 음성이라고 하면 990건을 맞혀 정확도는 99%입니다. 그러나 재현율은 0이고 유용한 경보도 없습니다. 먼저 혼동행렬의 절대 건수를 쓰고, 임곗값마다 precision·recall과 처리 가능한 경보 수를 함께 계산해야 합니다.</p></div>
      <table class="comparison-table">
        <thead><tr><th>목표</th><th>주로 조절할 것</th><th>확인 지표</th></tr></thead>
        <tbody>
          <tr><td>놓침 최소화</td><td>임곗값을 낮춤</td><td>Recall, FN 수</td></tr>
          <tr><td>헛경보 최소화</td><td>임곗값을 높임</td><td>Precision, FP 수</td></tr>
          <tr><td>확률 자체 신뢰</td><td>확률 보정</td><td>Calibration, Brier score</td></tr>
          <tr><td>전체 순위 비교</td><td>모델 점수</td><td>ROC-AUC, PR-AUC</td></tr>
        </tbody>
      </table>
    `,
    visuals: ["classification-threshold"],
    videos: ["logistic-regression-video"]
  }, {
    minutes: 22,
    keywords: ["calibration", "Brier score", "운영 임곗값", "기저율"],
    objectives: ["분류 점수·확률·임곗값·행동을 분리해 평가하고 조정한다."]
  });

  addSection("06-trees", {
    id: "ensemble-diversity-mastery",
    kicker: "15 · MASTERY NOTE",
    title: "앙상블의 힘은 트리 수보다 오차의 다양성에서 온다",
    body: S`
      <p>완전히 같은 트리를 여러 번 평균하면 결과는 바뀌지 않습니다. 랜덤 포레스트는 부트스트랩 표본과 노드별 무작위 특성 후보로 트리 사이의 상관을 낮춥니다. 각 트리가 어느 정도 정확하면서 서로 다른 실수를 할 때 평균이 분산을 줄입니다.</p>
      <p>배깅은 여러 모델을 독립적으로 학습해 평균하고, 부스팅은 앞선 모델이 남긴 오차에 다음 약한 학습기를 집중시킵니다. 그래서 랜덤 포레스트는 병렬화와 안정성에 강하고, gradient boosting 계열은 세밀한 예측력을 얻는 대신 학습률·깊이·반복 수에 더 민감합니다.</p>
      <table class="comparison-table">
        <thead><tr><th>모델</th><th>무작위성·순서</th><th>먼저 볼 파라미터</th><th>대표 진단</th></tr></thead>
        <tbody>
          <tr><td>Random Forest</td><td>부트스트랩 + 특성 무작위</td><td>n_estimators, max_features</td><td>OOB와 검증 점수 차이</td></tr>
          <tr><td>Extra Trees</td><td>분할 임곗값도 더 무작위</td><td>max_features, min_samples_leaf</td><td>속도와 분산 감소</td></tr>
          <tr><td>Gradient Boosting</td><td>잔차를 순차 보정</td><td>learning_rate × n_estimators</td><td>검증 곡선의 최적 반복</td></tr>
          <tr><td>HistGB / LightGBM</td><td>특성 값을 구간화</td><td>leaf 수, learning rate</td><td>과대적합과 학습 시간</td></tr>
        </tbody>
      </table>
      <div class="callout"><span class="callout-icon">i</span><div><strong>특성 중요도는 인과 효과가 아닙니다.</strong><p>불순도 기반 중요도는 값의 종류가 많은 특성을 선호할 수 있고, 상관된 특성끼리 중요도를 나눠 가질 수 있습니다. permutation importance와 부분 의존성도 검증 데이터에서 보조적으로 확인하세요.</p></div></div>
    `,
    visuals: ["tree-ensemble"],
    videos: ["decision-tree-video"]
  }, {
    minutes: 22,
    keywords: ["오차 상관", "앙상블 다양성", "permutation importance", "부분 의존성"],
    objectives: ["배깅과 부스팅의 오차 감소 원리와 모델별 진단 기준을 비교한다."]
  });

  addSection("07-unsupervised", {
    id: "unsupervised-evidence-mastery",
    kicker: "11 · MASTERY NOTE",
    title: "정답이 없을수록 여러 증거를 겹쳐 본다",
    body: S`
      <p>K-평균의 inertia는 k가 커질수록 항상 감소하므로 가장 작은 값을 고를 수 없습니다. elbow와 silhouette은 후보를 줄이는 도구일 뿐, 발견된 군집이 업무적으로 의미 있다는 보장은 아닙니다. 여러 초기값에서 군집이 안정적인지, 평균 이미지와 원본 표본이 공통 특성을 갖는지 함께 봅니다.</p>
      <p>PCA는 타깃을 모른 채 분산이 큰 방향을 보존합니다. 따라서 설명 분산 92%가 분류 정확도 92%를 뜻하지 않습니다. 압축 전후의 분류 성능·학습 시간·복원 오차를 같은 분할에서 비교해야 합니다. 최종 평가에서는 PCA도 Pipeline 안에서 훈련 폴드에만 fit합니다.</p>
      <table class="comparison-table">
        <thead><tr><th>질문</th><th>K-평균에서 볼 것</th><th>PCA에서 볼 것</th></tr></thead>
        <tbody>
          <tr><td>결과가 안정적인가?</td><td>seed별 군집·inertia 변동</td><td>폴드별 성분 수·성능 변동</td></tr>
          <tr><td>사람이 해석할 수 있는가?</td><td>중심·대표 표본·군집 크기</td><td>성분 이미지·큰 loading</td></tr>
          <tr><td>정보를 잃었는가?</td><td>작은·비구형 집단이 합쳐짐</td><td>복원 오차와 다운스트림 성능</td></tr>
          <tr><td>누출이 없는가?</td><td>평가 목적이면 분할 뒤 fit</td><td>Pipeline 내부에서 fit</td></tr>
        </tbody>
      </table>
    `,
    equation: {
      label: "PCA 투영과 복원",
      tex: S`Z=(X-\mathbf 1\mu^\top)W_k,\qquad \hat X=ZW_k^\top+\mathbf 1\mu^\top`,
      note: "Wₖ의 열은 서로 직교하는 상위 k개 주성분이며, X̂와 X의 차이가 압축으로 잃은 정보입니다."
    },
    visuals: ["kmeans-pca"],
    videos: ["kmeans-video", "pca-video"]
  }, {
    minutes: 24,
    keywords: ["군집 안정성", "대표 표본", "PCA loading", "복원 오차"],
    objectives: ["정답 없는 결과를 안정성·해석·복원·다운스트림 성능으로 다각도 평가한다."]
  });

  addSection("08-deep-learning", {
    id: "gradient-debugging-mastery",
    kicker: "17 · MASTERY NOTE",
    title: "신경망이 학습하지 않을 때 숫자 흐름부터 추적한다",
    body: S`
      <p>딥러닝 디버깅은 층을 더 쌓는 일보다 한 배치가 올바르게 흐르는지 확인하는 일에서 시작합니다. 입력의 shape·dtype·범위, 라벨의 표현, 출력의 shape, 손실 한 값을 먼저 출력합니다. 작은 데이터 20개를 거의 완벽히 외우지 못한다면 일반화 문제가 아니라 구현·최적화 문제일 가능성이 큽니다.</p>
      <table class="comparison-table">
        <thead><tr><th>관찰</th><th>가능한 원인</th><th>최소 실험</th></tr></thead>
        <tbody>
          <tr><td>손실이 처음부터 NaN</td><td>큰 입력·잘못된 로그·과한 학습률</td><td>입력 범위와 finite 여부, 학습률 1/10</td></tr>
          <tr><td>손실이 거의 안 변함</td><td>기울기 0, 라벨·손실 불일치</td><td>작은 배치 과대적합, gradient norm</td></tr>
          <tr><td>훈련만 계속 좋아짐</td><td>과대적합·검증 분포 차이</td><td>증강·dropout·early stopping</td></tr>
          <tr><td>정확도가 클래스 비율에 고정</td><td>한 클래스만 예측</td><td>혼동행렬과 예측 분포 출력</td></tr>
        </tbody>
      </table>
      <p>역전파는 각 파라미터가 손실에 미친 국소 변화율을 연쇄법칙으로 계산합니다. 옵티마이저는 그 기울기를 이용해 파라미터를 갱신합니다. 둘을 구분하면 “기울기는 정상인데 업데이트가 너무 크다”와 “기울기 자체가 사라졌다”를 다른 문제로 진단할 수 있습니다.</p>
    `,
    equation: {
      label: "한 번의 파라미터 갱신",
      tex: S`\theta_{t+1}=\theta_t-\eta\,g_t,\qquad g_t=\nabla_\theta\frac{1}{B}\sum_{i=1}^{B}\ell_i`,
      note: "학습률 η는 기울기의 방향이 아니라 한 스텝의 크기를 조절합니다. Adam은 좌표별 이동 크기도 적응적으로 조정합니다."
    },
    visuals: ["neural-network", "gradient-descent"],
    videos: ["Ilg3gGewQ5U"]
  }, {
    minutes: 24,
    keywords: ["작은 배치 과대적합", "gradient norm", "finite check", "예측 분포"],
    objectives: ["입력·출력·손실·기울기·업데이트 순서로 신경망 학습 실패를 진단한다."]
  });

  addSection("09-cnn", {
    id: "cnn-error-analysis-mastery",
    kicker: "19 · MASTERY NOTE",
    title: "CNN의 오분류를 공간·데이터·배포 문제로 나눈다",
    body: S`
      <p>전체 정확도가 같아도 모델의 실패 방식은 다를 수 있습니다. 클래스별 confusion matrix로 어떤 쌍이 섞이는지 찾고, 높은 확신의 오답·낮은 확신의 정답·각 클래스 대표 오답을 이미지 격자로 봅니다. 수화처럼 손 모양이 중요한 과업에서는 배경, 조명, 손의 위치가 정답 대신 사용된 것은 아닌지 확인해야 합니다.</p>
      <p>특징맵은 “이 채널이 고양이를 안다”는 증거가 아닙니다. 같은 채널이 여러 이미지에서 어떤 엣지·질감·부분에 반복 반응하는지 비교하고, 입력의 작은 이동이나 배경 변화에도 반응이 유지되는지 봅니다. Grad-CAM 같은 위치 설명도 모델의 인과적 근거가 아니라 민감도 단서로 해석합니다.</p>
      <table class="comparison-table">
        <thead><tr><th>실패 위치</th><th>확인할 것</th><th>수정 방향</th></tr></thead>
        <tbody>
          <tr><td>입력 파이프라인</td><td>채널 순서·크기·0~1·preprocess_input</td><td>훈련과 추론 함수를 하나로 공유</td></tr>
          <tr><td>공간 표현</td><td>너무 빠른 downsampling, 수용영역</td><td>층별 shape ledger와 특징맵</td></tr>
          <tr><td>일반화</td><td>배경·조명·각도에 따른 성능</td><td>라벨 보존 증강과 데이터 보강</td></tr>
          <tr><td>전이학습</td><td>동결 상태·BN 동작·학습률</td><td>헤드 우선 학습 뒤 낮은 LR 미세조정</td></tr>
        </tbody>
      </table>
    `,
    visuals: ["cnn-layers"],
    videos: ["KuXjwB4LzSA", "HGwBXDKFk9I"]
  }, {
    minutes: 24,
    keywords: ["오분류 격자", "수용영역", "Grad-CAM", "배포 전처리"],
    objectives: ["CNN 오분류를 입력·공간 표현·일반화·전이학습 문제로 구분해 분석한다."]
  });

  addSection("10-rnn", {
    id: "sequence-evaluation-mastery",
    kicker: "15 · MASTERY NOTE",
    title: "시퀀스 모델은 길이와 생성 절차까지 평가한다",
    body: S`
      <p>문장 분류에서는 전체 정확도뿐 아니라 길이 구간, OOV 비율, 부정 표현, 패딩 비율에 따른 성능을 나눠 봅니다. 패딩 토큰이 실제 단어처럼 상태를 바꾸지 않도록 mask를 전달하고, 잘라내는 방향이 중요한 정보를 제거하지 않는지 원문 예시로 확인합니다.</p>
      <p>다음 토큰 학습에서는 정답 접두사를 입력으로 주지만 생성 시에는 모델이 방금 고른 토큰을 다시 입력합니다. 초기 실수의 영향이 누적되는 <strong>노출 편향</strong> 때문에 훈련 정확도만으로 생성 품질을 설명할 수 없습니다. greedy, temperature sampling, top-k 같은 디코딩 정책을 같은 seed 문장에서 비교합니다.</p>
      <div class="worked-example"><span>SHAPE TRACE</span><h3>배치 32, 길이 80, 임베딩 64</h3><p>정수 입력은 \((32,80)\), Embedding 출력은 \((32,80,64)\)입니다. LSTM이 마지막 상태만 반환하면 \((32,h)\), 모든 시점 상태를 반환하면 \((32,80,h)\)입니다. 문장 분류에는 전자가, 시점별 다음 토큰 예측에는 후자가 자연스럽습니다.</p></div>
      <p>온도 \(T<1\)은 확률을 뾰족하게 만들어 반복적이지만 안정적인 출력을, \(T>1\)은 다양한 출력을 만들지만 문법적 오류도 늘립니다. 한 생성 예시가 아니라 여러 seed와 온도에서 반복·다양성·사실성을 함께 평가하세요.</p>
    `,
    equation: {
      label: "온도 기반 다음 토큰 분포",
      tex: S`p_T(w_i)=\frac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}`,
      note: "T가 0에 가까워지면 최대 로짓 토큰에 집중하고, 커질수록 분포가 평평해집니다."
    },
    visuals: ["rnn-unfold"],
    videos: ["AsNTP8Kwu80", "YCzL96nL7j0"]
  }, {
    minutes: 22,
    keywords: ["노출 편향", "길이 구간 평가", "top-k decoding", "teacher forcing"],
    objectives: ["시퀀스의 길이·마스크·OOV와 생성 디코딩 정책을 분리해 평가한다."]
  });

  addSection("11-dli-practicum", {
    id: "reproducible-lab-protocol",
    kicker: "15 · MASTERY NOTE",
    title: "실습 완료의 기준은 재현 가능한 한 번의 전체 실행이다",
    body: S`
      <p>노트북은 위 셀의 숨은 상태에 의존하기 쉽습니다. 커널을 재시작하고 위에서 아래로 모두 실행했을 때 같은 데이터 분할, shape, 모델 구조와 평가 결과가 나와야 합니다. 중간에 변수를 수동으로 바꾸어 성공한 결과는 재현 가능한 파이프라인이 아닙니다.</p>
      <ol>
        <li><strong>환경 고정:</strong> TensorFlow·CUDA 버전, GPU 인식, seed를 첫 셀에서 기록합니다.</li>
        <li><strong>데이터 계약:</strong> 클래스 순서, 한 배치의 shape·dtype·범위, 분할 크기를 출력합니다.</li>
        <li><strong>모델 계약:</strong> 출력 뉴런·활성화와 라벨 인코딩·손실의 조합을 한 표로 확인합니다.</li>
        <li><strong>훈련 증거:</strong> train/validation loss와 metric을 같은 그래프에 기록하고 최고 epoch를 저장합니다.</li>
        <li><strong>추론 재현:</strong> 저장 모델을 새 프로세스에서 불러와 동일 전처리로 표본을 예측합니다.</li>
        <li><strong>실패 기록:</strong> 오분류와 변경한 가설·결과를 남겨 무작위 튜닝을 피합니다.</li>
      </ol>
      <table class="comparison-table">
        <thead><tr><th>현상</th><th>먼저 확인</th><th>그다음 실험</th></tr></thead>
        <tbody>
          <tr><td>훈련 정확도도 낮음</td><td>shape·라벨·손실·학습률</td><td>작은 배치 외우기</td></tr>
          <tr><td>검증만 낮음</td><td>분할·중복·분포 차이</td><td>CNN·증강·규제</td></tr>
          <tr><td>새 사진만 실패</td><td>resize·채널·정규화</td><td>배포 조건 데이터 보강</td></tr>
          <tr><td>미세조정 뒤 악화</td><td>재compile·동결·학습률</td><td>해제 층 축소, LR 감소</td></tr>
        </tbody>
      </table>
    `,
    visuals: ["mnist", "cnn-layers"],
    videos: ["HGwBXDKFk9I"]
  }, {
    minutes: 24,
    keywords: ["재현 가능한 노트북", "데이터 계약", "추론 재현", "실패 기록"],
    objectives: ["NVIDIA 실습을 커널 재시작부터 저장 모델 추론까지 재현 가능한 절차로 완성한다."]
  });

  addSection("12-anomaly", {
    id: "anomaly-operations-mastery",
    kicker: "11 · MASTERY NOTE",
    title: "좋은 이상 점수도 운영 경보로 바꾸면 다시 평가해야 한다",
    body: S`
      <p>이상이 0.1%인 100만 건에서 실제 이상은 1,000건입니다. 재현율 90%, 거짓 양성률 1%라면 900건을 잡지만 정상 약 999,000건 중 약 9,990건을 잘못 경보합니다. 경보 10,890건 가운데 진짜는 약 8.3%뿐입니다. 낮아 보이는 FPR도 기저율과 결합하면 큰 업무량이 됩니다.</p>
      <p>따라서 모델 AUC와 별개로 하루 경보 수, 상위 K개 precision, 평균 탐지 지연, 조사 시간, 반복 경보 억제 규칙을 평가합니다. 임곗값은 테스트가 아니라 검증 기간에서 고르고, 운영 중 점수 분포와 확인된 정답을 이용해 재보정합니다.</p>
      <table class="comparison-table">
        <thead><tr><th>변화</th><th>관찰 신호</th><th>대응</th></tr></thead>
        <tbody>
          <tr><td>입력 분포 변화</td><td>특성·재구성 오차 분포 이동</td><td>원인 확인, 스케일러·모델 재학습</td></tr>
          <tr><td>공격·이상 유형 변화</td><td>확인된 이상 recall 하락</td><td>새 라벨 보강, 표현·모델 재검토</td></tr>
          <tr><td>정상 행동의 계절성</td><td>특정 시간대 경보 폭증</td><td>시간 조건 임곗값·계절 특성</td></tr>
          <tr><td>조사 용량 변화</td><td>대기 경보 누적</td><td>경보 예산에 맞춘 임곗값과 순위화</td></tr>
        </tbody>
      </table>
      <div class="callout warning"><span class="callout-icon">!</span><div><strong>이상 점수의 방향을 확인하세요.</strong><p>재구성 오차는 클수록 이상이지만 일부 판별 점수는 작을수록 이상일 수 있습니다. PR-AUC를 계산하기 전에 점수 방향과 양성 라벨을 작은 예시로 검증합니다.</p></div></div>
    `,
    equation: {
      label: "기저율을 포함한 경보 정밀도",
      tex: S`\Pr(Y=1\mid A)=\frac{\mathrm{TPR}\,\pi}{\mathrm{TPR}\,\pi+\mathrm{FPR}(1-\pi)}`,
      note: "π는 실제 이상 비율입니다. 같은 TPR·FPR에서도 π가 작아지면 경보의 정밀도는 크게 낮아집니다."
    },
    visuals: ["autoencoder"]
  }, {
    minutes: 22,
    keywords: ["경보 정밀도", "분포 이동", "탐지 지연", "상위 K개 precision"],
    objectives: ["기저율과 조사 용량을 반영해 이상 점수를 운영 경보 정책으로 변환한다."]
  });

  if (window.THEORY_COVERAGE) {
    window.THEORY_COVERAGE.topics = chapters.reduce((sum, item) => sum + item.sections.length, 0);
    window.THEORY_COVERAGE.minutes = chapters.reduce((sum, item) => sum + item.minutes, 0);
    window.THEORY_COVERAGE.visuals = visuals.length;
    window.THEORY_COVERAGE.videos = media.length;
  }
})();
