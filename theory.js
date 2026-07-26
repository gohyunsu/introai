/* Expanded, original theory companion. Source lecture files are never bundled. */
(() => {
  const S = String.raw;
  const chapters = window.CHAPTERS || [];

  function chapter(id) {
    return chapters.find((item) => item.id === id);
  }

  function insertAfter(chapterId, anchorId, additions) {
    const target = chapter(chapterId);
    if (!target) return;
    const anchor = target.sections.findIndex((section) => section.id === anchorId);
    const position = anchor < 0 ? target.sections.length : anchor + 1;
    target.sections.splice(position, 0, ...additions);
  }

  function enrich(chapterId, { minutes = 0, keywords = [], objectives = [] } = {}) {
    const target = chapter(chapterId);
    if (!target) return;
    target.minutes += minutes;
    target.keywords = [...new Set([...target.keywords, ...keywords])];
    target.objectives = [...new Set([...target.objectives, ...objectives])];
  }

  insertAfter("01-ai-map", "nested-map", [
    {
      id: "rules-experts-learning",
      kicker: "02 · THREE WAYS TO BUILD INTELLIGENCE",
      title: "규칙, 탐색, 학습은 서로 다른 도구다",
      body: S`
        <p>AI 시스템이 모두 데이터에서 배우는 것은 아닙니다. <strong>규칙 기반 시스템</strong>은 전문가가 “조건이면 결론” 형태의 지식을 직접 적습니다. <strong>탐색·계획 시스템</strong>은 가능한 행동의 나무를 펼치고 목표에 도달하는 경로를 찾습니다. <strong>머신러닝</strong>은 많은 사례에서 입력과 출력 사이의 통계적 관계를 추정합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>접근</th><th>사람이 제공하는 것</th><th>장점</th><th>주요 한계</th></tr></thead>
          <tbody>
            <tr><td>규칙 기반</td><td>명시적 규칙과 예외</td><td>판단 근거가 선명하고 동작을 통제하기 쉽다.</td><td>현실의 수많은 예외를 계속 관리해야 한다.</td></tr>
            <tr><td>탐색·계획</td><td>상태, 가능한 행동, 목표</td><td>규칙이 정확한 게임·경로 문제에 강하다.</td><td>경우의 수가 폭발하면 계산이 어려워진다.</td></tr>
            <tr><td>머신러닝</td><td>데이터, 목표, 평가 기준</td><td>사람이 말로 쓰기 어려운 패턴을 얻는다.</td><td>데이터 밖의 상황과 편향에 취약할 수 있다.</td></tr>
          </tbody>
        </table>
        <p>예를 들어 세금 계산은 규칙이 명확하므로 일반 프로그램이 더 적합합니다. 반면 손글씨의 모든 획 모양을 규칙으로 열거하기는 어렵기 때문에 학습이 유리합니다. 중요한 판단은 “AI를 쓸 것인가?”보다 <strong>문제의 어느 부분을 어떤 방식으로 자동화할 것인가</strong>입니다.</p>
        <div class="callout"><span class="callout-icon">?</span><div><strong>전문가 시스템은 왜 커질수록 어려워질까?</strong><p>규칙 수만 늘어나는 것이 아니라 규칙 사이의 충돌과 예외 조합도 늘어납니다. 학습은 이 명시적 규칙 작성을 데이터 기반 함수 추정으로 바꾸지만, 데이터 품질이라는 새로운 책임을 만듭니다.</p></div></div>
      `
    }
  ]);

  insertAfter("01-ai-map", "reverse-thinking", [
    {
      id: "population-and-generalization",
      kicker: "04 · POPULATION",
      title: "표본에서 배워도 목표는 모집단이다",
      body: S`
        <p>우리가 손에 쥔 데이터셋은 세상 전체가 아니라 모집단 분포 \(\mathcal D\)에서 뽑힌 유한한 <strong>표본</strong>입니다. 훈련 손실이 작다는 말은 본 표본에 잘 맞는다는 뜻이고, 실제 목표는 앞으로 \(\mathcal D\)에서 올 입력의 <strong>기대 손실</strong>을 작게 만드는 것입니다.</p>
      `,
      equation: {
        label: "경험 위험과 기대 위험",
        tex: S`\underbrace{\hat R(\theta)}_{\text{훈련 표본에서 측정}}=\frac1n\sum_{i=1}^{n}\ell(y_i,h_\theta(x_i)),\qquad \underbrace{R(\theta)}_{\text{실제 목표}}=\mathbb E_{(x,y)\sim\mathcal D}[\ell(y,h_\theta(x))]`,
        note: "학습에서는 경험 위험만 직접 계산할 수 있습니다. 검증·테스트 분리와 규제는 경험 위험과 기대 위험의 간격을 줄이기 위한 장치입니다."
      },
      afterBody: S`
        <p>두 값의 차이가 <strong>일반화 간격</strong>입니다. 모델이 너무 복잡하거나 표본이 작고 편향되어 있으면 훈련 표본의 우연한 특징까지 외워 간격이 커집니다. 반대로 지나치게 단순하면 훈련과 새 데이터 모두에서 성능이 낮습니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>대표성</b><span>표본의 조건·비율·측정 방식이 배포 환경을 닮아야 합니다.</span></div>
          <div class="concept-card"><b>독립성</b><span>같은 사람·장면의 거의 동일한 표본이 훈련과 테스트에 동시에 들어가지 않아야 합니다.</span></div>
          <div class="concept-card"><b>정답 품질</b><span>라벨 기준이 일관되지 않으면 모델이 모순된 목표를 학습합니다.</span></div>
          <div class="concept-card"><b>분포 변화</b><span>시간이 지나 입력 분포나 정답 관계가 바뀌면 재평가가 필요합니다.</span></div>
        </div>
      `
    }
  ]);

  insertAfter("01-ai-map", "problem-first", [
    {
      id: "application-map",
      kicker: "07 · APPLICATION MAP",
      title: "입력과 출력의 모양으로 응용 분야를 읽는다",
      body: S`
        <p>컴퓨터 비전, 자연어 처리, 추천, 강화학습은 서로 완전히 다른 세계처럼 보이지만 <strong>입력 표현과 원하는 출력</strong>이 다를 뿐 같은 학습 골격을 공유합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>분야</th><th>대표 입력</th><th>대표 출력</th><th>이 수업의 연결점</th></tr></thead>
          <tbody>
            <tr><td>컴퓨터 비전</td><td>높이×너비×채널의 픽셀 텐서</td><td>클래스, 위치, 마스크</td><td>CNN, 데이터 증강, 전이학습</td></tr>
            <tr><td>자연어 처리</td><td>토큰 ID의 순서</td><td>감성, 다음 토큰, 문장</td><td>임베딩, RNN, LSTM</td></tr>
            <tr><td>추천 시스템</td><td>사용자·항목·행동 기록</td><td>클릭 확률이나 순위</td><td>분류·회귀, 표현 학습</td></tr>
            <tr><td>강화학습</td><td>환경의 상태</td><td>다음 행동을 고르는 정책</td><td>행동 뒤에 늦게 오는 보상으로 학습</td></tr>
            <tr><td>이상 탐지</td><td>정상·이상 행동의 특성</td><td>이상 점수와 경보</td><td>트리, 오토인코더, 임곗값</td></tr>
          </tbody>
        </table>
        <p>강화학습에서는 정답 라벨 대신 환경과 상호작용하여 얻는 보상 \(r_t\)를 사용합니다. 당장의 보상뿐 아니라 할인된 미래 보상 \(\sum_{k=0}^{\infty}\gamma^k r_{t+k}\)을 크게 하는 행동 정책을 배운다는 점이 지도학습과 다릅니다.</p>
      `
    },
    {
      id: "end-to-end-loop",
      kicker: "08 · PROJECT LOOP",
      title: "모델 학습은 프로젝트의 가운데 한 단계다",
      body: S`
        <ol>
          <li><strong>문제와 사용자 정의:</strong> 누가 어떤 결정을 내릴 때 모델 출력이 필요한지 적습니다.</li>
          <li><strong>관측 단위 정의:</strong> 한 행 또는 한 이미지가 무엇을 나타내며 어느 시점의 정보인지 정합니다.</li>
          <li><strong>데이터 수집·정제:</strong> 중복, 결측, 잘못된 라벨, 클래스 불균형과 개인정보를 점검합니다.</li>
          <li><strong>기준선 설정:</strong> 다수 클래스나 단순 선형 모델처럼 이겨야 할 최소 성능을 만듭니다.</li>
          <li><strong>학습·검증:</strong> 훈련 데이터로 파라미터를 구하고 검증 데이터로 선택합니다.</li>
          <li><strong>최종 평가:</strong> 고정해 둔 테스트 데이터로 일반화 성능과 실패 유형을 측정합니다.</li>
          <li><strong>배포·모니터링:</strong> 입력 변환을 재현하고 지연 시간, 분포 변화, 실제 오류 비용을 추적합니다.</li>
        </ol>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>높은 정확도만으로 성공이라 할 수 없습니다.</strong><p>사기 거래처럼 희귀한 사건에서는 모두 정상이라고 해도 정확도가 높습니다. 실제 의사결정 비용에 맞는 데이터 분할과 지표가 필요합니다.</p></div></div>
      `
    }
  ]);

  enrich("01-ai-map", {
    minutes: 28,
    keywords: ["전문가 시스템", "탐색", "모집단", "기대 위험", "일반화 간격", "강화학습", "배포 모니터링"],
    objectives: ["규칙 기반·탐색·머신러닝 접근을 문제 조건에 따라 구분한다.", "표본 손실과 모집단 일반화 성능이 다른 이유를 설명한다."]
  });

  insertAfter("02-ml-knn", "tasks-methods", [
    {
      id: "ml-vocabulary",
      kicker: "02 · VOCABULARY",
      title: "샘플·특성·타깃·파라미터를 정확히 구분한다",
      body: S`
        <p>표 형태 데이터에서 한 행은 <strong>샘플(sample)</strong>, 예측에 사용하는 각 열은 <strong>특성(feature)</strong>, 맞히려는 값은 <strong>타깃(target)</strong>입니다. 길이와 무게로 생선 종류를 예측한다면 \(x=[\text{length},\text{weight}]\), \(y=\text{species}\)입니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>데이터 \(X\)</b><span>모양은 보통 (샘플 수, 특성 수). 모델에 넣는 관측값입니다.</span></div>
          <div class="concept-card"><b>타깃 \(y\)</b><span>모양은 보통 (샘플 수,). 지도학습에서 모델이 맞힐 정답입니다.</span></div>
          <div class="concept-card"><b>파라미터</b><span>학습 데이터에서 자동으로 정해지는 계수·가중치입니다.</span></div>
          <div class="concept-card"><b>하이퍼파라미터</b><span>학습 전에 사람이 정하거나 검증으로 고르는 \(k\), 트리 깊이, 학습률입니다.</span></div>
        </div>
        <p><strong>모델</strong>은 단순히 알고리즘 이름이 아니라, 알고리즘이 데이터로부터 얻은 상태까지 포함합니다. 같은 K-NN 알고리즘도 저장한 훈련 데이터와 \(k\)가 다르면 다른 모델입니다.</p>
      `
    },
    {
      id: "reinforcement-loop",
      kicker: "03 · LEARNING SIGNAL",
      title: "지도·비지도·강화학습은 피드백이 다르다",
      body: S`
        <p>지도학습은 각 입력에 즉시 정답이 붙어 있지만 강화학습은 행동의 결과가 여러 단계 뒤에 나타날 수 있습니다. 에이전트가 상태 \(s_t\)에서 행동 \(a_t\)를 고르면 환경이 다음 상태 \(s_{t+1}\)와 보상 \(r_t\)를 돌려줍니다. 목표는 한 번의 정답을 맞히는 것이 아니라 <strong>장기 누적 보상</strong>을 키우는 정책 \(\pi(a\mid s)\)을 찾는 것입니다.</p>
        <div class="callout"><span class="callout-icon">≠</span><div><strong>군집과 분류를 혼동하지 마세요.</strong><p>군집 번호 0·1·2는 모델이 발견한 그룹의 이름일 뿐 ‘사과·바나나·파인애플’이라는 의미를 자동으로 갖지 않습니다. 사람이 결과를 해석해야 합니다.</p></div></div>
      `
    }
  ]);

  insertAfter("02-ml-knn", "reinforcement-loop", [
    {
      id: "algorithm-atlas",
      kicker: "04 · ALGORITHM ATLAS",
      title: "과업 하나를 여러 알고리즘으로 풀 수 있다",
      body: S`
        <p>분류·회귀·군집은 <strong>무엇을 할지</strong>이고, K-NN·결정트리·신경망은 <strong>어떻게 계산할지</strong>입니다. 하나의 알고리즘이 여러 과업을 풀기도 하고, 같은 과업을 서로 다른 가정의 알고리즘이 풀기도 합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>방법</th><th>핵심 가정 또는 계산</th><th>대표 과업</th></tr></thead>
          <tbody>
            <tr><td>Linear / Logistic regression</td><td>특성의 가중합으로 값 또는 로그 오즈를 표현</td><td>회귀·분류</td></tr>
            <tr><td>Perceptron</td><td>오분류 표본으로 선형 경계의 가중치를 수정</td><td>이진분류</td></tr>
            <tr><td>Naive Bayes</td><td>클래스가 주어지면 특성들이 조건부 독립이라고 근사</td><td>분류</td></tr>
            <tr><td>K-NN</td><td>가까운 표본은 비슷한 타깃을 가짐</td><td>분류·회귀</td></tr>
            <tr><td>Decision tree</td><td>특성 임곗값 질문을 반복해 공간을 나눔</td><td>분류·회귀</td></tr>
            <tr><td>SVM</td><td>클래스 사이의 마진이 큰 경계를 찾음</td><td>분류·회귀</td></tr>
            <tr><td>K-means / EM</td><td>숨은 그룹의 중심 또는 확률 분포를 번갈아 추정</td><td>군집·밀도 추정</td></tr>
            <tr><td>PCA / SOM</td><td>분산 방향 또는 이웃 구조를 보존해 표현을 축소</td><td>차원 축소·시각화</td></tr>
            <tr><td>Bagging / Boosting</td><td>여러 약한 모델의 예측을 결합</td><td>분류·회귀</td></tr>
            <tr><td>Neural network</td><td>선형 변환과 비선형성을 층으로 합성</td><td>분류·회귀·생성</td></tr>
          </tbody>
        </table>
        <p><strong>선형/비선형</strong>, <strong>지도/비지도</strong>, <strong>단일/앙상블</strong>은 서로 다른 분류 축입니다. 예를 들어 랜덤 포레스트는 지도학습·비선형·앙상블 모델입니다.</p>
      `
    }
  ]);

  insertAfter("02-ml-knn", "knn-intuition", [
    {
      id: "knn-probability-and-boundary",
      kicker: "05 · GEOMETRY",
      title: "확률처럼 보이는 값도 결국 이웃의 비율이다",
      body: S`
        <p>K-NN의 <code>predict_proba</code>는 선택된 \(k\)개 이웃 중 각 클래스가 차지한 비율을 반환합니다. \(k=3\)이면 가능한 확률은 0, \(1/3\), \(2/3\), 1뿐입니다. 이는 매끄러운 확률 모델의 추정치와 달리 <strong>국소 투표 비율</strong>입니다.</p>
        <p>결정 경계는 공간을 각 훈련점과 가장 가까운 영역으로 나누는 보로노이 구조에서 만들어집니다. \(k=1\)이면 경계가 모든 표본 주변을 구불구불 감싸고, \(k\)가 커지면 여러 영역이 평균되어 매끄러워집니다.</p>
        <div class="worked-example"><span>WORKED EXAMPLE</span><h3>새 생선의 세 이웃이 도미·도미·빙어라면</h3><p>예측 클래스는 도미이고, 이웃 비율 기반 확률은 \(P(\text{도미}\mid x)=2/3\), \(P(\text{빙어}\mid x)=1/3\)입니다. 거리가 훨씬 가까운 빙어 한 마리도 기본 K-NN에서는 도미 한 표와 같은 한 표입니다. 거리 가중치를 사용하면 가까운 이웃에 더 큰 표를 줄 수 있습니다.</p></div>
      `
    }
  ]);

  insertAfter("02-ml-knn", "fit-api", [
    {
      id: "knn-complexity",
      kicker: "08 · LIMITS",
      title: "훈련이 가벼운 대신 예측이 무겁다",
      body: S`
        <p>K-NN의 훈련은 사실상 \(n\)개 표본을 저장하는 일입니다. 새 표본 하나를 예측할 때 단순 구현은 모든 훈련 표본과 \(p\)개 특성의 거리를 계산하므로 대략 \(O(np)\) 연산과 \(O(np)\) 저장 공간이 필요합니다.</p>
        <p>특성 수가 매우 커지면 모든 점 사이의 거리가 비슷해지는 <strong>차원의 저주</strong>가 나타납니다. 충분히 가까운 이웃을 찾으려면 차원이 늘수록 훨씬 많은 데이터가 필요합니다. 따라서 K-NN은 직관과 작은 데이터의 기준선에는 훌륭하지만, 큰 고차원 데이터에서는 차원 축소·근사 최근접 탐색이나 다른 모델을 고려합니다.</p>
        <div class="callout success"><span class="callout-icon">✓</span><div><strong>K-NN을 쓰기 전 세 가지</strong><p>모든 특성을 같은 기준으로 스케일링했는가? \(k\)를 검증 데이터로 골랐는가? 예측 시간과 메모리를 감당할 수 있는가?</p></div></div>
      `
    }
  ]);

  enrich("02-ml-knn", {
    minutes: 24,
    keywords: ["샘플", "특성", "타깃", "파라미터", "보로노이", "거리 가중치", "차원의 저주", "계산복잡도"],
    objectives: ["샘플·특성·타깃·파라미터·하이퍼파라미터를 예제로 구분한다.", "K-NN의 확률 출력과 시간·공간 복잡도를 해석한다."]
  });

  insertAfter("03-data", "split", [
    {
      id: "validation-protocol",
      kicker: "02 · EVALUATION PROTOCOL",
      title: "검증은 선택을 위해, 테스트는 보고를 위해",
      body: S`
        <p>모델 후보, \(k\), 규제 강도, 특성 조합을 비교할 때마다 성능 정보를 보고 선택합니다. 이 선택에 사용되는 데이터가 <strong>검증 세트</strong>입니다. 테스트 세트는 모든 선택이 끝날 때까지 봉인해야 합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>데이터</th><th>모델이 직접 학습?</th><th>사람의 선택에 사용?</th><th>몇 번 확인?</th></tr></thead>
          <tbody>
            <tr><td>훈련</td><td>예</td><td>간접적으로 사용</td><td>여러 에포크</td></tr>
            <tr><td>검증</td><td>아니오</td><td>예</td><td>실험마다</td></tr>
            <tr><td>테스트</td><td>아니오</td><td>아니오</td><td>최종 한 번</td></tr>
          </tbody>
        </table>
        <p>데이터가 작다면 훈련 세트를 여러 폴드로 바꾸어 검증하는 교차검증을 사용합니다. 그러나 최종 테스트 세트는 교차검증 밖에 그대로 남겨 둡니다.</p>
      `
    },
    {
      id: "data-leakage",
      kicker: "03 · LEAKAGE",
      title: "정답을 직접 주지 않아도 미래 정보가 새어 들어갈 수 있다",
      body: S`
        <p><strong>데이터 누출</strong>은 실제 예측 시점에는 알 수 없는 정보가 훈련이나 전처리에 들어가는 현상입니다. 전체 데이터의 평균·표준편차로 먼저 표준화한 뒤 나누면 테스트 분포의 정보가 훈련 변환에 스며듭니다. 환자 퇴원 후 작성된 코드를 입원 시 예측 특성으로 쓰는 것도 누출입니다.</p>
        <ol>
          <li>먼저 행을 훈련·검증·테스트로 나눕니다.</li>
          <li>결측 대치, 스케일러, PCA는 훈련 데이터에만 <code>fit</code>합니다.</li>
          <li>같은 변환 상태로 검증·테스트를 <code>transform</code>합니다.</li>
          <li>같은 사람·장비·시간 묶음이 양쪽에 갈라지지 않도록 그룹 또는 시간 기준으로 나눕니다.</li>
        </ol>
      `
    }
  ]);

  insertAfter("03-data", "sampling", [
    {
      id: "numpy-shapes",
      kicker: "05 · ARRAYS & SHAPES",
      title: "데이터를 합치는 방향이 의미를 결정한다",
      body: S`
        <p>NumPy 배열의 <code>shape</code>는 단순한 크기 표시가 아니라 축의 의미입니다. 길이와 무게 각각이 \((49,)\)라면 두 특성을 열 방향으로 묶은 입력은 \((49,2)\), 두 클래스의 타깃은 \((49,)\)가 되어야 합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>연산</th><th>예시 결과</th><th>언제 쓰는가</th></tr></thead>
          <tbody>
            <tr><td><code>column_stack</code></td><td>(49,) 두 개 → (49, 2)</td><td>특성 열을 옆으로 붙일 때</td></tr>
            <tr><td><code>concatenate</code></td><td>(35,) + (14,) → (49,)</td><td>샘플이나 타깃을 같은 축으로 이어 붙일 때</td></tr>
            <tr><td><code>reshape(-1, 1)</code></td><td>(49,) → (49, 1)</td><td>특성 하나도 2차원 입력으로 만들 때</td></tr>
            <tr><td>불리언 인덱싱</td><td>\(X[y=1]\)</td><td>특정 클래스나 조건의 행을 고를 때</td></tr>
          </tbody>
        </table>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>\(-1\)은 자동 계산 축입니다.</strong><p><code>reshape(-1, 1)</code>은 행 수를 NumPy가 원소 개수에서 계산하게 합니다. 원소 수가 보존되지 않는 reshape는 실패해야 정상입니다.</p></div></div>
      `,
      code: {
        title: "형상과 클래스 비율을 확인하는 최소 코드",
        content: `fish_data = np.column_stack((fish_length, fish_weight))
fish_target = np.concatenate((np.ones(35), np.zeros(14)))

print(fish_data.shape)    # (49, 2)
print(fish_target.shape)  # (49,)
print(np.unique(fish_target, return_counts=True))`
      }
    }
  ]);

  insertAfter("03-data", "scaling", [
    {
      id: "scaling-without-leakage",
      kicker: "07 · FIT THE TRANSFORM",
      title: "평균과 표준편차도 학습되는 값이다",
      body: S`
        <p>표준점수 \(z=(x-\mu)/\sigma\)에서 \(\mu\)와 \(\sigma\)는 훈련 데이터로부터 얻는 파라미터입니다. 테스트 표본을 자기 평균으로 다시 표준화하면 훈련 때와 다른 좌표계를 사용하게 됩니다.</p>
      `,
      equation: {
        label: "훈련 통계로 모든 데이터 변환",
        tex: S`\mu_j=\frac1{n_{\mathrm{train}}}\sum_{i\in\mathrm{train}}x_{ij},\quad \sigma_j=\sqrt{\frac1{n_{\mathrm{train}}}\sum_{i\in\mathrm{train}}(x_{ij}-\mu_j)^2},\quad z_{ij}=\frac{x_{ij}-\mu_j}{\sigma_j}`,
        note: "검증·테스트의 z도 훈련에서 구한 μⱼ, σⱼ를 사용합니다."
      },
      afterBody: S`
        <p><code>Pipeline</code>은 스케일러와 모델을 묶어 교차검증의 각 폴드에서도 이 원칙을 자동으로 지킵니다. 거리 기반 K-NN, 규제 선형 모델, 신경망은 스케일에 민감합니다. 반면 결정트리는 한 특성 안에서 임곗값 순서를 비교하므로 보통 표준화가 필수는 아닙니다.</p>
      `,
      code: {
        title: "전처리 누출을 막는 파이프라인",
        content: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

model = make_pipeline(StandardScaler(), KNeighborsClassifier())
model.fit(train_input, train_target)
print(model.score(test_input, test_target))`
      }
    }
  ]);

  insertAfter("03-data", "augmentation-eda", [
    {
      id: "augmentation-validity",
      kicker: "09 · LABEL-PRESERVING CHANGE",
      title: "좋은 증강은 정답을 보존하는 변화만 만든다",
      body: S`
        <p>회전, 이동, 확대·축소, 밝기, 색상 채널 변화, 원근 변환은 이미지의 다양한 관측 조건을 흉내 냅니다. 하지만 모든 변환이 모든 문제에서 정답을 보존하지는 않습니다. ‘6’과 ‘9’를 180° 돌리거나 교통 표지판의 좌우를 뒤집으면 클래스가 달라질 수 있습니다.</p>
        <table class="comparison-table">
          <thead><tr><th>변환</th><th>가르치는 불변성</th><th>주의할 문제</th></tr></thead>
          <tbody>
            <tr><td>좌우 반전</td><td>방향이 달라도 같은 대상</td><td>글자, 수화, 좌우 비대칭 의료 영상</td></tr>
            <tr><td>회전·이동</td><td>작은 자세·위치 변화</td><td>방향 자체가 정답인 문제</td></tr>
            <tr><td>밝기·채널</td><td>조명과 카메라 변화</td><td>색이 진단 근거인 문제</td></tr>
            <tr><td>원근·호모그래피</td><td>촬영 시점의 변화</td><td>기하학적 치수가 중요한 문제</td></tr>
          </tbody>
        </table>
        <p>증강은 훈련 시 매번 무작위로 적용하고 검증·테스트에는 적용하지 않습니다. 검증 데이터까지 증강하면 비교 기준이 계속 움직입니다.</p>
      `
    },
    {
      id: "eda-housing",
      kicker: "10 · UNDERSTAND BEFORE MODELING",
      title: "탐색적 분석은 모델 전에 데이터가 말하는 범위를 확인한다",
      body: S`
        <p>실제 데이터에서는 먼저 열의 타입, 결측치, 최솟값·사분위수·최댓값, 범주 빈도와 중복을 확인합니다. 캘리포니아 주택 데이터처럼 위치가 중요한 경우 경도·위도를 산점도로 그려 밀집도를 투명도로, 가격을 색으로 표현하면 표만 볼 때 놓친 공간 패턴이 드러납니다.</p>
        <ol>
          <li><strong>단변량:</strong> 각 특성의 분포, 이상치, 긴 꼬리를 확인합니다.</li>
          <li><strong>이변량:</strong> 특성과 타깃의 관계, 특성끼리의 상관과 중복 정보를 봅니다.</li>
          <li><strong>그룹 비교:</strong> 클래스·지역·시간별 표본 수와 오류 가능성을 봅니다.</li>
          <li><strong>특성 조합:</strong> 방 수 자체보다 가구당 방 수처럼 문제 의미에 맞는 비율을 검토합니다.</li>
        </ol>
        <div class="callout"><span class="callout-icon">i</span><div><strong>상관은 원인도, 미래 성능도 보장하지 않습니다.</strong><p>상관계수는 주로 선형 관계를 요약하며 제3의 변수, 시간 누출, 표본 선택 편향에 의해 커질 수 있습니다.</p></div></div>
      `
    }
  ]);

  enrich("03-data", {
    minutes: 42,
    keywords: ["검증 프로토콜", "데이터 누출", "NumPy shape", "브로드캐스팅", "Pipeline", "호모그래피", "상관관계", "공간 시각화"],
    objectives: ["NumPy 배열의 축과 reshape·결합 연산을 입력 형상에 맞게 사용한다.", "전처리 누출과 정답을 훼손하는 데이터 증강을 판별한다.", "탐색적 분석에서 분포·결측·상관·그룹 차이를 점검한다."]
  });

  insertAfter("04-regression", "knn-regression", [
    {
      id: "regression-metrics",
      kicker: "02 · METRICS",
      title: "오차의 단위와 기준선을 함께 읽는다",
      body: S`
        <p><strong>MAE</strong>는 오차 절댓값의 평균이라 타깃과 같은 단위입니다. 농어 무게의 MAE가 19라면 평균적으로 약 19g 틀렸다는 뜻입니다. <strong>MSE</strong>는 큰 오차를 제곱해 더 강하게 벌하지만 단위도 제곱됩니다. <strong>RMSE</strong>는 MSE에 제곱근을 취해 원래 단위로 돌아옵니다.</p>
      `,
      equation: {
        label: "대표 회귀 지표",
        tex: S`\operatorname{MAE}=\frac1n\sum_i|y_i-\hat y_i|,\quad \operatorname{MSE}=\frac1n\sum_i(y_i-\hat y_i)^2,\quad R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}`,
        note: "R²=1은 완벽한 예측, 0은 언제나 훈련 타깃 평균을 말하는 기준선과 같은 수준입니다. 테스트에서 음수가 될 수도 있습니다."
      },
      afterBody: S`
        <p>\(R^2\)가 음수라는 것은 오류가 계산 실수라는 뜻이 아니라, 새 데이터에서 평균만 예측하는 것보다도 못하다는 뜻입니다. 지표는 반드시 검증·테스트 데이터에서 계산하고, MAE처럼 업무 단위로 해석 가능한 지표를 함께 봅니다.</p>
      `
    }
  ]);

  insertAfter("04-regression", "extrapolation", [
    {
      id: "linear-model-solution",
      kicker: "04 · HOW A LINE IS LEARNED",
      title: "직선의 계수는 오차 제곱합을 최소화한다",
      body: S`
        <p>선형회귀는 \(\hat y=w_0+w_1x_1+\cdots+w_px_p\) 형태를 가정합니다. ‘선형’은 입력과 출력 그래프가 언제나 직선이라는 뜻보다 <strong>학습할 계수 \(w\)에 대해 선형</strong>이라는 뜻입니다. \(x^2\)을 새 특성으로 넣어도 계수에 대해서는 선형 모델입니다.</p>
        <p>작거나 중간 규모의 문제는 최소제곱 해를 선형대수로 구할 수 있고, 데이터가 매우 크거나 신경망처럼 비선형 조합이 많으면 경사하강법으로 반복 갱신합니다.</p>
      `,
      equation: {
        label: "최소제곱과 정규방정식",
        tex: S`\hat{\mathbf w}=\arg\min_{\mathbf w}\|\mathbf y-\mathbf X\mathbf w\|_2^2,\qquad \hat{\mathbf w}=(\mathbf X^\top\mathbf X)^{-1}\mathbf X^\top\mathbf y`,
        note: "실제 라이브러리는 역행렬을 직접 계산하기보다 수치적으로 안정적인 SVD나 QR 분해를 주로 사용합니다."
      },
      afterBody: S`
        <div class="worked-example"><span>INTERPRET THE MODEL</span><h3>\(\hat y=39.02x-709.02\)</h3><p>길이가 1cm 늘 때 예측 무게가 약 39g 증가하고, 절편은 수학적으로 직선의 위치를 맞춥니다. 길이 0cm에서 -709g이라는 해석은 물리적으로 무의미하므로, 선형 모델도 관측 범위 밖 외삽에서는 문제 지식으로 점검해야 합니다.</p></div>
      `
    }
  ]);

  insertAfter("04-regression", "feature-engineering", [
    {
      id: "polynomial-growth",
      kicker: "06 · FEATURE EXPANSION",
      title: "다항 특성은 곡선을 만들지만 열의 수가 빠르게 늘어난다",
      body: S`
        <p>길이·높이·두께 세 특성에 2차 다항 변환을 적용하면 원래 열뿐 아니라 제곱과 상호작용 \(x_1x_2\)가 추가됩니다. 상호작용은 “길이의 효과가 두께에 따라 달라진다”는 표현력을 줍니다.</p>
        <p>\(p\)개 원래 특성에서 차수 \(d\) 이하의 모든 항 수는 대략 \(\binom{p+d}{d}\)로 증가합니다. 특성 3개와 5차만 해도 많은 열이 생겨 훈련 데이터를 완벽히 맞추면서 테스트 \(R^2\)가 크게 음수가 될 수 있습니다.</p>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>특성을 많이 만드는 것이 정보를 만드는 것은 아닙니다.</strong><p>같은 원본 값의 조합을 늘리면 표현력과 함께 분산과 다중공선성도 커집니다. 교차검증과 규제가 필요합니다.</p></div></div>
      `
    }
  ]);

  insertAfter("04-regression", "regularization", [
    {
      id: "ridge-lasso-detail",
      kicker: "08 · L2 VS L1",
      title: "Ridge는 나누어 줄이고, Lasso는 일부를 끈다",
      body: S`
        <p>규제는 훈련 오차에 큰 계수에 대한 벌점을 더합니다. \(\alpha\)가 커질수록 단순한 모델을 더 강하게 선호합니다. 절편은 보통 규제하지 않으며, 계수 크기를 공정하게 비교하려면 먼저 특성을 표준화해야 합니다.</p>
      `,
      equation: {
        label: "L2와 L1 규제 목적함수",
        tex: S`J_{\mathrm{ridge}}(\mathbf w)=\operatorname{MSE}+\alpha\sum_{j=1}^{p}w_j^2,\qquad J_{\mathrm{lasso}}(\mathbf w)=\operatorname{MSE}+\alpha\sum_{j=1}^{p}|w_j|`,
        note: "Ridge의 부드러운 L2 벌점은 계수를 0에 가깝게 만들고, Lasso의 모서리가 있는 L1 벌점은 일부 계수를 정확히 0으로 만들 수 있습니다."
      },
      afterBody: S`
        <table class="comparison-table">
          <thead><tr><th>상황</th><th>Ridge</th><th>Lasso</th></tr></thead>
          <tbody>
            <tr><td>상관된 특성</td><td>효과를 여러 계수에 나누는 경향</td><td>일부만 남겨 선택이 불안정할 수 있음</td></tr>
            <tr><td>특성 선택</td><td>대부분 0은 아님</td><td>일부 계수를 정확히 0으로</td></tr>
            <tr><td>최적화</td><td>직접 해법 또는 반복법</td><td>좌표하강 같은 반복법, <code>max_iter</code> 점검</td></tr>
          </tbody>
        </table>
        <p>최적 \(\alpha\)는 테스트가 아니라 교차검증으로 고릅니다. \(\alpha=0\)은 규제 없는 선형회귀에 가깝고, 너무 큰 값은 모든 계수를 지나치게 줄여 과소적합시킵니다.</p>
      `
    }
  ]);

  enrich("04-regression", {
    minutes: 36,
    keywords: ["MSE", "RMSE", "정규방정식", "최소제곱", "다중회귀", "상호작용", "다중공선성", "L1", "L2"],
    objectives: ["MAE·MSE·RMSE·R²의 단위와 기준선을 해석한다.", "정규방정식과 경사하강법이 같은 최소제곱 목표를 푸는 두 방법임을 설명한다.", "다항 특성의 증가와 Ridge·Lasso의 효과를 연결한다."]
  });

  insertAfter("05-classification", "probability", [
    {
      id: "multiclass-knn-probability",
      kicker: "02 · MULTICLASS BASELINE",
      title: "다중분류에서는 클래스 순서까지 확인한다",
      body: S`
        <p>생선 7종을 K-NN으로 분류하면 <code>predict_proba</code>는 샘플마다 7개 확률을 반환합니다. 열의 순서는 사람이 예상한 데이터 등장 순서가 아니라 <code>model.classes_</code>에 저장된 순서입니다. 예측 클래스는 가장 큰 확률 열의 클래스입니다.</p>
        <p>\(k=3\)이면 확률이 \(1/3\) 단위로만 움직여 정교한 신뢰도를 표현하기 어렵습니다. 이 한계가 입력의 가중합을 연속적인 로짓으로 만들고 이를 시그모이드·소프트맥스로 변환하는 로지스틱 회귀로 이어집니다.</p>
      `,
      code: {
        title: "확률 열과 클래스의 대응 확인",
        content: `proba = kn.predict_proba(test_scaled[:5])
print(kn.classes_)
print(np.round(proba, 3))

row = 0
predicted = kn.classes_[np.argmax(proba[row])]`
      }
    },
    {
      id: "logit-worked-example",
      kicker: "03 · LOGIT",
      title: "로짓은 확률이 되기 전의 제한 없는 점수다",
      body: S`
        <p>로지스틱 회귀도 먼저 선형 점수 \(z=\mathbf w^\top\mathbf x+b\)를 계산합니다. \(z\)는 음의 무한대부터 양의 무한대까지 가능하고, 시그모이드가 이를 0과 1 사이로 누릅니다.</p>
      `,
      equation: {
        label: "확률, 오즈, 로짓의 관계",
        tex: S`p=\sigma(z)=\frac1{1+e^{-z}},\qquad \frac{p}{1-p}=e^z,\qquad \log\frac{p}{1-p}=z`,
        note: "z=0이면 p=0.5입니다. z가 1 증가하면 오즈가 e배가 됩니다."
      },
      afterBody: S`
        <div class="worked-example"><span>WORKED EXAMPLE</span><h3>로짓 \(z=2\)를 확률로 바꾸기</h3><p>\(p=1/(1+e^{-2})\approx0.881\)입니다. 기본 임곗값 0.5라면 양성으로 분류합니다. 임곗값을 0.9로 올리면 같은 모델·같은 확률이어도 음성 결정이 됩니다. <strong>확률 추정과 의사결정 규칙은 별도</strong>입니다.</p></div>
      `
    }
  ]);

  insertAfter("05-classification", "cross-entropy", [
    {
      id: "loss-label-contract",
      kicker: "05 · TARGET ENCODING",
      title: "출력층·타깃 인코딩·손실 함수는 한 세트다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>과업</th><th>출력</th><th>타깃</th><th>손실</th></tr></thead>
          <tbody>
            <tr><td>이진분류</td><td>시그모이드 1개</td><td>0 또는 1</td><td>Binary cross-entropy</td></tr>
            <tr><td>다중 단일라벨</td><td>소프트맥스 \(K\)개</td><td>정수 클래스 ID</td><td>Sparse categorical cross-entropy</td></tr>
            <tr><td>다중 단일라벨</td><td>소프트맥스 \(K\)개</td><td>원-핫 벡터</td><td>Categorical cross-entropy</td></tr>
            <tr><td>다중 멀티라벨</td><td>시그모이드 \(K\)개</td><td>각 클래스 0/1</td><td>클래스별 binary cross-entropy</td></tr>
          </tbody>
        </table>
        <p>원-핫 \([0,0,1,0]\)과 정수 2는 같은 정답을 다른 형식으로 표현합니다. 다만 그 형식에 맞는 손실을 골라야 합니다. 소프트맥스는 클래스가 서로 배타적이라고 보고 합이 1인 분포를 만들고, 멀티라벨 시그모이드는 각 클래스를 독립적으로 켜고 끕니다.</p>
      `
    }
  ]);

  insertAfter("05-classification", "gradient-descent", [
    {
      id: "batch-step-epoch",
      kicker: "08 · TRAINING CLOCK",
      title: "배치·스텝·에포크는 학습 시간을 세는 서로 다른 단위다",
      body: S`
        <p><strong>배치(batch)</strong>는 한 번의 기울기 계산에 사용하는 샘플 묶음, <strong>스텝(step)</strong>은 한 번의 파라미터 업데이트, <strong>에포크(epoch)</strong>는 훈련 데이터 전체를 한 번 사용한 구간입니다. 샘플 1,000개와 배치 크기 100이면 한 에포크는 대략 10스텝입니다.</p>
        <table class="comparison-table">
          <thead><tr><th>방법</th><th>배치 크기</th><th>특징</th></tr></thead>
          <tbody>
            <tr><td>Batch GD</td><td>전체 데이터</td><td>기울기가 안정적이지만 한 업데이트가 무겁다.</td></tr>
            <tr><td>Stochastic GD</td><td>1</td><td>빠르게 자주 갱신하지만 경로의 잡음이 크다.</td></tr>
            <tr><td>Mini-batch GD</td><td>그 사이</td><td>GPU 병렬성과 적당한 기울기 잡음의 균형. 딥러닝의 기본.</td></tr>
          </tbody>
        </table>
        <p><code>partial_fit</code>은 기존 상태를 유지하며 한 배치씩 학습합니다. 첫 호출에서는 가능한 전체 클래스 목록을 알려야 출력 구조를 확정할 수 있습니다. 에포크가 늘면서 훈련 점수만 계속 오르고 검증 점수가 내려가면 과대적합 신호입니다.</p>
      `
    }
  ]);

  insertAfter("05-classification", "svm", [
    {
      id: "svm-margin-kernel",
      kicker: "10 · MARGIN",
      title: "SVM은 맞힌 개수뿐 아니라 경계의 여유를 크게 만든다",
      body: S`
        <p>SVM은 두 클래스 사이의 결정 경계 중 가장 가까운 훈련점과의 거리인 <strong>마진</strong>을 크게 만드는 경계를 찾습니다. 경계에 가장 가까워 해를 결정하는 점이 서포트 벡터입니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>\(C\)가 큼</b><span>훈련 오류를 강하게 벌해 복잡한 경계를 허용합니다. 과대적합 위험이 커질 수 있습니다.</span></div>
          <div class="concept-card"><b>\(C\)가 작음</b><span>일부 오류를 허용하고 넓은 마진을 선호합니다. 규제가 강합니다.</span></div>
          <div class="concept-card"><b>선형 커널</b><span>원래 특성 공간에서 초평면 경계를 만듭니다.</span></div>
          <div class="concept-card"><b>RBF 커널</b><span>가까운 정도를 이용해 비선형 경계를 만들며 \(\gamma\)가 영향 범위를 정합니다.</span></div>
        </div>
        <p>SVM 역시 거리와 내적에 의존하므로 표준화가 중요합니다. \(C\), 커널, \(\gamma\)는 훈련 정확도가 아니라 교차검증으로 고릅니다.</p>
      `
    }
  ]);

  enrich("05-classification", {
    minutes: 38,
    keywords: ["오즈", "로짓", "원-핫 인코딩", "멀티라벨", "배치", "스텝", "미니배치", "마진", "서포트 벡터", "RBF 커널"],
    objectives: ["다중분류 확률의 열과 클래스 순서를 정확히 대응한다.", "출력 활성화·타깃 인코딩·손실 함수의 호환 관계를 결정한다.", "배치·스텝·에포크와 SVM의 C·커널을 설명한다."]
  });

  insertAfter("06-trees", "tree", [
    {
      id: "tree-anatomy-worked",
      kicker: "02 · NODE ANATOMY",
      title: "한 노드에는 질문·불순도·표본 구성이 함께 적힌다",
      body: S`
        <p>결정트리의 내부 노드는 “당도 \(\le 1.625\)인가?”처럼 한 특성의 임곗값을 묻습니다. 조건을 만족하면 왼쪽, 아니면 오른쪽으로 내려가며, 리프에서는 가장 많은 클래스 또는 평균값을 예측합니다.</p>
      `,
      equation: {
        label: "지니 불순도와 가중 불순도 감소",
        tex: S`G(t)=1-\sum_{k=1}^{K}p_{k|t}^2,\qquad \Delta G=G(t)-\frac{n_L}{n_t}G(L)-\frac{n_R}{n_t}G(R)`,
        note: "모두 한 클래스면 G=0입니다. 이진 클래스가 반반이면 G=0.5로 가장 많이 섞였습니다."
      },
      afterBody: S`
        <div class="worked-example"><span>WORKED EXAMPLE</span><h3>노드에 레드 3병, 화이트 1병</h3><p>\(G=1-(3/4)^2-(1/4)^2=0.375\)입니다. 후보 질문마다 자식 노드의 가중 지니를 계산하고, 부모에서 가장 많이 줄이는 질문을 선택합니다.</p></div>
        <p>트리는 한 특성의 값 순서와 임곗값만 사용하므로 표준화로 단위가 바뀌어도 같은 분할을 만들 수 있습니다. 다만 결측 처리와 범주형 인코딩 방식은 여전히 중요합니다.</p>
      `
    }
  ]);

  insertAfter("06-trees", "pruning", [
    {
      id: "structured-unstructured",
      kicker: "04 · DATA FIT",
      title: "정형 데이터에서는 트리 앙상블이 강력한 기준선이다",
      body: S`
        <p>CSV·데이터베이스처럼 행과 열로 의미가 고정된 <strong>정형 데이터</strong>에서는 수치·범주 특성의 비선형 상호작용을 잘 다루는 트리 앙상블이 강력합니다. 이미지·텍스트·음성 같은 <strong>비정형 데이터</strong>는 원시 입력의 지역·순서 구조를 활용하는 CNN·RNN·Transformer 계열이 유리한 경우가 많습니다.</p>
        <p>단일 결정트리는 시각화와 규칙 설명이 쉽지만 작은 데이터 변화에도 구조가 크게 바뀔 수 있습니다. 깊이, 최소 분할 샘플, 최소 리프 샘플, 최소 불순도 감소를 제한하면 분산을 줄일 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("06-trees", "validation-search", [
    {
      id: "cross-validation-mechanics",
      kicker: "06 · CROSS-VALIDATION",
      title: "각 표본이 한 번씩 검증 역할을 맡는다",
      body: S`
        <p>\(k\)-폴드 교차검증은 훈련 데이터를 \(k\)조각으로 나누어 한 조각씩 검증에 쓰고 나머지로 학습합니다. 최종 점수는 \(k\)개 검증 점수의 평균이며 표준편차도 함께 보아 분할에 대한 민감도를 확인합니다.</p>
        <p>분류에서는 <code>StratifiedKFold</code>로 각 폴드의 클래스 비율을 유지합니다. 시계열은 미래로 과거를 예측하는 누출을 막기 위해 무작위 폴드 대신 시간 순서를 보존해야 하고, 같은 환자나 장비의 반복 측정은 그룹 단위로 나눠야 합니다.</p>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>전처리도 폴드 안에서 다시 학습해야 합니다.</strong><p>스케일러나 PCA를 전체 훈련 데이터에 미리 fit한 뒤 교차검증하면 각 검증 폴드의 정보가 들어갑니다. Pipeline을 사용하세요.</p></div></div>
      `
    },
    {
      id: "grid-random-search",
      kicker: "07 · SEARCH STRATEGY",
      title: "그리드는 모든 조합을, 랜덤은 중요한 축을 더 넓게 본다",
      body: S`
        <p>그리드 탐색은 지정한 후보의 곱집합을 모두 평가합니다. 깊이 15개×최소 분할 10개×불순도 9개에 5-폴드라면 6,750번 학습합니다. 랜덤 탐색은 분포에서 정한 수만큼 조합을 뽑아 같은 예산으로 더 넓은 범위를 볼 수 있습니다.</p>
        <table class="comparison-table">
          <thead><tr><th>선택</th><th>적합한 상황</th><th>주의</th></tr></thead>
          <tbody>
            <tr><td>GridSearchCV</td><td>후보가 적고 좋은 범위를 이미 앎</td><td>차원이 늘면 조합 수가 폭발</td></tr>
            <tr><td>RandomizedSearchCV</td><td>범위가 넓고 일부 변수만 중요</td><td>분포와 반복 수를 합리적으로 설정</td></tr>
          </tbody>
        </table>
        <p><code>best_estimator_</code>는 최선의 설정으로 전체 훈련 데이터를 다시 학습한 모델입니다. 이 모델을 마지막 테스트 세트에서 한 번 평가합니다.</p>
      `
    }
  ]);

  insertAfter("06-trees", "bagging", [
    {
      id: "voting-bootstrap-oob",
      kicker: "09 · DIVERSITY",
      title: "앙상블의 힘은 모델 수보다 서로 다른 실수에서 나온다",
      body: S`
        <p><strong>하드 보팅</strong>은 클래스 표의 다수결, <strong>소프트 보팅</strong>은 예측 확률의 평균을 사용합니다. 모든 모델이 같은 실수를 한다면 평균내도 개선되지 않으므로, 데이터와 특성을 무작위화해 모델 사이의 상관을 낮춥니다.</p>
        <p>랜덤 포레스트는 원 데이터에서 중복 허용으로 뽑은 <strong>부트스트랩 표본</strong>마다 트리를 만들고, 각 노드에서는 무작위 특성 일부만 후보로 봅니다. 한 트리의 부트스트랩에 뽑히지 않은 <strong>OOB(out-of-bag)</strong> 표본으로 별도 검증 세트 없이 일반화 성능을 추정할 수도 있습니다.</p>
        <div class="callout"><span class="callout-icon">i</span><div><strong>불순도 기반 중요도는 인과 효과가 아닙니다.</strong><p>고유값이 많은 특성을 선호할 수 있습니다. 특성 하나를 섞었을 때 검증 성능이 얼마나 떨어지는지 보는 permutation importance와 함께 해석하세요.</p></div></div>
      `
    }
  ]);

  insertAfter("06-trees", "boosting", [
    {
      id: "ensemble-zoo",
      kicker: "11 · ENSEMBLE FAMILY",
      title: "Extra Trees부터 XGBoost까지 차이는 무작위성과 보정 방식이다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>알고리즘</th><th>핵심 아이디어</th><th>성격</th></tr></thead>
          <tbody>
            <tr><td>Extra Trees</td><td>전체 데이터와 무작위 분할 임곗값</td><td>더 빠르고 다양성이 크며 분산을 줄인다.</td></tr>
            <tr><td>Gradient Boosting</td><td>얕은 트리가 이전 모델의 손실 기울기를 순차 보정</td><td>강력하지만 순차 학습이라 느릴 수 있다.</td></tr>
            <tr><td>Histogram Boosting</td><td>연속 특성을 구간으로 묶어 분할 후보 축소</td><td>큰 데이터에서 빠르고 메모리 효율적이다.</td></tr>
            <tr><td>XGBoost</td><td>규제·결측 처리·병렬화를 강화한 부스팅</td><td>정형 데이터와 이상 탐지 실습으로 이어진다.</td></tr>
            <tr><td>LightGBM</td><td>히스토그램과 리프 중심 성장</td><td>대용량에서 빠르지만 작은 데이터 과적합을 점검한다.</td></tr>
            <tr><td>CatBoost</td><td>범주형 특성과 순서 기반 부스팅 처리</td><td>범주형 전처리 부담을 줄인다.</td></tr>
          </tbody>
        </table>
        <p>배깅은 여러 모델을 독립적으로 만들어 <strong>분산</strong>을 줄이는 쪽, 부스팅은 약한 모델을 순차적으로 더해 <strong>편향</strong>을 줄이는 쪽에 가깝습니다.</p>
      `
    }
  ]);

  enrich("06-trees", {
    minutes: 42,
    keywords: ["노드", "리프", "OOB", "하드 보팅", "소프트 보팅", "Extra Trees", "LightGBM", "CatBoost", "permutation importance"],
    objectives: ["지니 불순도와 가중 정보 이득을 수치로 계산한다.", "데이터 구조에 맞는 교차검증 분할과 탐색 방법을 고른다.", "배깅·보팅·부스팅과 주요 트리 앙상블을 비교한다."]
  });

  insertAfter("07-unsupervised", "clustering", [
    {
      id: "fruit-pixels",
      kicker: "02 · IMAGE AS DATA",
      title: "100×100 이미지는 10,000차원 벡터가 될 수 있다",
      body: S`
        <p>과일 300장 배열의 모양이 \((300,100,100)\)이라면 첫 축은 샘플, 나머지는 높이와 너비입니다. 이를 \((300,10000)\)으로 펼치면 각 픽셀이 하나의 특성이 되어 K-평균과 PCA 같은 표 형태 알고리즘에 넣을 수 있습니다.</p>
        <p>샘플별 픽셀 평균 히스토그램은 사진 전체의 밝기 차이를, 픽셀 위치별 클래스 평균 이미지는 과일의 평균적인 형태를 보여 줍니다. 평균 사과 이미지와 각 사진의 평균 절댓값 차이를 계산하면 ‘전형적인 사과’와 가까운 이미지를 찾을 수 있지만 위치·회전 변화에는 취약합니다.</p>
      `,
      equation: {
        label: "평균 템플릿과 샘플 차이",
        tex: S`\bar{\mathbf x}_{\text{apple}}=\frac1{n_a}\sum_{i:y_i=a}\mathbf x_i,\qquad d_i=\frac1p\sum_{j=1}^{p}|x_{ij}-\bar x_{\text{apple},j}|`,
        note: "이 계산은 라벨을 알고 평균을 만들 때만 가능합니다. 라벨이 없다면 K-평균이 중심을 추정합니다."
      }
    }
  ]);

  insertAfter("07-unsupervised", "kmeans", [
    {
      id: "kmeans-objective",
      kicker: "04 · OBJECTIVE",
      title: "K-평균은 중심까지의 거리 제곱합을 번갈아 줄인다",
      body: S`
        <p>K-평균은 (1) 중심 초기화, (2) 가장 가까운 중심으로 할당, (3) 할당된 표본 평균으로 중심 갱신을 반복합니다. 각 단계는 다음 목적함수인 inertia를 증가시키지 않지만, 초기 중심에 따라 서로 다른 지역 최솟값에 도달할 수 있습니다.</p>
      `,
      equation: {
        label: "K-평균 목적함수",
        tex: S`J=\sum_{i=1}^{n}\left\|\mathbf x_i-\boldsymbol\mu_{c_i}\right\|_2^2,\qquad \boldsymbol\mu_k=\frac1{|C_k|}\sum_{i\in C_k}\mathbf x_i`,
        note: "cᵢ는 i번째 표본의 군집 번호, μₖ는 k번째 군집 중심입니다."
      },
      afterBody: S`
        <p>여러 초기값을 시도하는 <code>n_init</code>과 K-means++ 초기화가 나쁜 시작의 위험을 줄입니다. K-평균은 구형이고 크기가 비슷한 군집, 유클리드 거리, 수치 특성이라는 가정을 암묵적으로 갖습니다. 길쭉하거나 밀도가 다른 군집에는 잘 맞지 않을 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("07-unsupervised", "choose-k", [
    {
      id: "cluster-evaluation",
      kicker: "06 · INTERPRETATION",
      title: "inertia는 K가 늘면 반드시 줄어든다",
      body: S`
        <p>\(K=n\)이면 각 표본이 자기 군집이 되어 inertia가 0이므로 작은 inertia만으로 좋은 \(K\)를 정할 수 없습니다. 엘보 방법은 감소 폭이 갑자기 완만해지는 지점을 찾지만 명확한 팔꿈치가 없을 수도 있습니다.</p>
        <p>라벨이 없다면 군집 내부 응집도와 군집 사이 분리를 함께 보는 실루엣 점수, 여러 초기화에서의 안정성, 실제 해석 가능성을 함께 봅니다. 군집 번호는 바뀔 수 있으므로 “군집 0이 항상 사과” 같은 의미를 코드에 고정하면 안 됩니다.</p>
      `
    }
  ]);

  insertAfter("07-unsupervised", "pca", [
    {
      id: "pca-mathematics",
      kicker: "08 · PCA STEP BY STEP",
      title: "중심을 옮기고 가장 큰 분산 방향에 투영한다",
      body: S`
        <ol>
          <li>각 특성의 평균을 빼 데이터 중심을 원점으로 옮깁니다.</li>
          <li>공분산 구조 또는 SVD로 서로 직교하는 주성분 방향을 구합니다.</li>
          <li>가장 큰 분산을 설명하는 앞 \(m\)개 방향에 데이터를 투영합니다.</li>
          <li>필요하면 그 좌표를 원래 공간으로 역변환해 근사 복원합니다.</li>
        </ol>
      `,
      equation: {
        label: "투영과 근사 복원",
        tex: S`\mathbf Z=(\mathbf X-\boldsymbol\mu)\mathbf W_m,\qquad \hat{\mathbf X}=\mathbf Z\mathbf W_m^\top+\boldsymbol\mu`,
        note: "Wₘ의 열은 앞 m개 주성분입니다. 버린 방향의 정보만큼 재구성 오차가 남습니다."
      },
      afterBody: S`
        <p><strong>설명 분산 비율</strong>은 각 주성분이 전체 분산 중 차지하는 비율입니다. <code>PCA(n_components=0.92)</code>처럼 목표 누적 비율을 지정하면 92% 이상을 보존하는 최소 성분 수를 선택합니다. 이는 정확도 92%가 아니라 데이터 변동의 92%입니다.</p>
        <p>10,000픽셀을 50개 성분으로 줄인 뒤 로지스틱 회귀를 학습하면 잡음과 계산량이 줄어 더 빠르면서 성능이 유지될 수 있습니다. 다만 PCA는 타깃을 보지 않으므로 분산이 작은 분류 핵심 정보가 버려질 가능성도 있습니다.</p>
      `
    }
  ]);

  enrich("07-unsupervised", {
    minutes: 34,
    keywords: ["이미지 벡터화", "템플릿", "K-means++", "지역 최솟값", "실루엣", "공분산", "SVD", "투영", "역변환"],
    objectives: ["과일 이미지 배열을 샘플×특성 행렬로 변환하고 평균 이미지를 해석한다.", "K-평균 목적함수와 초기화·군집 형상 가정을 설명한다.", "PCA의 중심화·투영·복원·설명 분산을 수식으로 연결한다."]
  });

  insertAfter("08-deep-learning", "neuron", [
    {
      id: "neuron-worked-example",
      kicker: "02 · CALCULATE A NEURON",
      title: "뉴런 하나를 손으로 계산하면 신경망 전체가 보인다",
      body: S`
        <p>입력 \(\mathbf x=[3,2,1]\), 가중치 \(\mathbf w=[0.1,-0.5,0.3]\), 편향 \(b=0.1\)인 뉴런을 생각해 봅시다. 먼저 입력별 중요도를 곱해 더합니다.</p>
      `,
      equation: {
        label: "가중합과 시그모이드 출력",
        tex: S`v=\mathbf x^\top\mathbf w+b=3(0.1)+2(-0.5)+1(0.3)+0.1=-0.3,\qquad y=\sigma(-0.3)\approx0.426`,
        note: "가중합 v는 제한이 없고 활성화 함수가 최종 출력의 범위와 비선형성을 정합니다."
      },
      afterBody: S`
        <p>편향은 입력이 모두 0일 때도 뉴런이 반응할 기준을 만들며 결정 경계를 평행 이동시킵니다. 학습은 이 계산식을 바꾸는 일이 아니라 \(w\)와 \(b\)를 손실이 줄어드는 값으로 바꾸는 일입니다.</p>
      `
    },
    {
      id: "activation-functions",
      kicker: "03 · ACTIVATION",
      title: "활성화 함수가 없으면 여러 층도 결국 한 층이다",
      body: S`
        <p>선형 변환을 연속해서 적용하면 \(\mathbf W_3\mathbf W_2\mathbf W_1\mathbf x\)는 하나의 행렬 \(\mathbf W'\mathbf x\)로 합쳐집니다. 층 사이의 비선형 활성화가 있어야 신경망이 구부러진 경계와 복잡한 함수를 표현합니다.</p>
        <table class="comparison-table">
          <thead><tr><th>함수</th><th>범위</th><th>주요 용도와 성질</th></tr></thead>
          <tbody>
            <tr><td>Linear</td><td>\((-\infty,\infty)\)</td><td>연속값 회귀 출력</td></tr>
            <tr><td>Sigmoid</td><td>\((0,1)\)</td><td>이진 확률 출력. 큰 절댓값에서 기울기 소실.</td></tr>
            <tr><td>tanh</td><td>\((-1,1)\)</td><td>0 중심 출력. 전통 RNN 상태에 사용.</td></tr>
            <tr><td>ReLU</td><td>\([0,\infty)\)</td><td>은닉층 기본. 양수에서 기울기 1, 음수에서 0.</td></tr>
            <tr><td>Leaky ReLU</td><td>제한 없음</td><td>음수에도 작은 기울기를 남겨 죽은 ReLU 완화.</td></tr>
            <tr><td>Softmax</td><td>각 값 \((0,1)\), 합 1</td><td>서로 배타적인 다중 클래스 출력.</td></tr>
          </tbody>
        </table>
        <p>시그모이드 미분은 \(\sigma'(x)=\sigma(x)(1-\sigma(x))\)이고 최대도 0.25입니다. 여러 층에서 이 작은 값을 반복 곱하면 앞층으로 가는 기울기가 사라질 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "layers", [
    {
      id: "tensor-shapes-params",
      kicker: "05 · SHAPE LEDGER",
      title: "층마다 출력 형상과 파라미터 수를 적는다",
      body: S`
        <p>Fashion-MNIST 한 이미지는 \(28\times28\)입니다. <code>Flatten</code>은 픽셀 순서를 유지한 채 \((28,28)\)을 \((784,)\)로 바꾸며 학습 파라미터는 없습니다. 784개 입력에서 100개 뉴런으로 가는 Dense는 각 연결의 가중치와 뉴런별 편향을 갖습니다.</p>
      `,
      equation: {
        label: "Dense 층 파라미터 수",
        tex: S`\#\mathrm{params}=d_{\mathrm{in}}d_{\mathrm{out}}+d_{\mathrm{out}},\qquad 784\cdot100+100=78{,}500`,
        note: "이어지는 100→10 출력층은 100×10+10=1,010개입니다. 총 79,510개가 학습됩니다."
      },
      afterBody: S`
        <p>배치 차원은 <code>None</code>으로 표시됩니다. 이는 샘플 수를 모델 구조에 고정하지 않겠다는 뜻입니다. <code>model.summary()</code>에서 출력 형상과 파라미터 수를 직접 계산한 값과 대조하면 연결 오류를 훈련 전에 찾을 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "mnist-first-loop", [
    {
      id: "mnist-data-contract",
      kicker: "07 · PREPARE THE DATA",
      title: "평탄화·정규화·범주화는 서로 다른 변환이다",
      body: S`
        <ol>
          <li><strong>평탄화:</strong> \((28,28)\rightarrow(784,)\). Dense가 받을 모양으로 바꾸지만 값의 범위는 그대로입니다.</li>
          <li><strong>정규화:</strong> 픽셀을 255로 나누어 \([0,255]\rightarrow[0,1]\). 최적화의 수치 범위를 안정시킵니다.</li>
          <li><strong>범주 인코딩:</strong> 클래스 ID 3을 \([0,0,0,1,0,\dots]\)로 바꿉니다. 손실 함수가 정수 라벨을 받으면 생략할 수 있습니다.</li>
        </ol>
        <p>MNIST의 70,000장 중 훈련과 검증을 나누고, 테스트는 마지막 평가에만 사용합니다. 이미지 입력 \(X\), 타깃 \(y\), 출력층의 세 모양이 배치 축에서 일치해야 합니다.</p>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>출력 10개는 숫자 값 0~9를 회귀하는 것이 아닙니다.</strong><p>10개 클래스의 확률을 나타냅니다. 숫자 9를 9.0에 가깝게 예측하는 회귀로 만들면 클래스 사이에 존재하지 않는 거리 관계를 강요합니다.</p></div></div>
      `
    }
  ]);

  insertAfter("08-deep-learning", "backprop", [
    {
      id: "gradient-worked-example",
      kicker: "09 · DERIVATIVE",
      title: "기울기는 파라미터를 조금 바꿀 때 손실이 얼마나 변하는지 말한다",
      body: S`
        <p>두 점 \((1,3),(2,5)\)를 직선 \(\hat y=mx+b\)로 맞추고 MSE를 최소화한다고 합시다. \(m=-1,b=5\)에서 편미분이 \(\partial L/\partial m=-7\), \(\partial L/\partial b=-3\)이라면 두 파라미터를 증가시키는 쪽이 손실을 줄입니다.</p>
      `,
      equation: {
        label: "한 번의 경사하강 업데이트",
        tex: S`m\leftarrow m-\eta\frac{\partial L}{\partial m},\qquad b\leftarrow b-\eta\frac{\partial L}{\partial b}`,
        note: "η=0.1이면 m=-0.3, b=5.3으로 이동합니다. 기울기가 음수이므로 빼는 연산 결과 값은 증가합니다."
      },
      afterBody: S`
        <p>학습률이 너무 크면 골짜기를 건너뛰며 발산하고, 너무 작으면 안전하지만 매우 느립니다. 역전파는 합성함수의 연쇄법칙으로 모든 층의 편미분을 효율적으로 계산하고, SGD·Adam 같은 옵티마이저가 그 기울기로 실제 업데이트를 수행합니다.</p>
        <p>Adam은 기울기의 이동 평균과 제곱 기울기의 이동 평균을 이용해 파라미터별 보폭을 조절합니다. 편리한 기본값이지만 검증 곡선과 학습률을 확인해야 한다는 원칙은 같습니다.</p>
      `
    },
    {
      id: "training-clock-deep",
      kicker: "10 · TRAINING LOOP",
      title: "compile–fit–evaluate는 서로 다른 책임을 가진다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>단계</th><th>결정하는 것</th><th>대표 확인</th></tr></thead>
          <tbody>
            <tr><td><code>compile</code></td><td>손실, 옵티마이저, 표시할 지표</td><td>출력·타깃 형식과 손실이 맞는가?</td></tr>
            <tr><td><code>fit</code></td><td>배치별 순전파·역전파·업데이트</td><td>훈련/검증 손실 곡선이 어떻게 변하는가?</td></tr>
            <tr><td><code>evaluate</code></td><td>가중치 변경 없는 손실·지표 계산</td><td>보지 않은 데이터에서도 성능이 유지되는가?</td></tr>
            <tr><td><code>predict</code></td><td>새 입력의 모델 출력</td><td>확률·로짓의 모양과 후처리가 맞는가?</td></tr>
          </tbody>
        </table>
        <p><code>history.history</code>에는 에포크별 <code>loss</code>, <code>accuracy</code>, <code>val_loss</code>, <code>val_accuracy</code>가 저장됩니다. 정확도가 오르더라도 검증 손실이 먼저 상승할 수 있는데, 이는 틀린 예측의 확신이 커지고 있다는 신호입니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "training-memory", [
    {
      id: "memory-precision",
      kicker: "12 · MEMORY BUDGET",
      title: "학습 메모리는 파라미터 파일 크기보다 크다",
      body: S`
        <p>FP32 파라미터 \(N\)개는 \(4N\)바이트입니다. Adam 학습 중에는 가중치, 기울기, 1차 모멘트, 2차 모멘트가 각각 비슷한 크기로 필요해 파라미터 관련 메모리만 대략 네 배가 됩니다. 여기에 역전파를 위한 중간 activation과 임시 연산 공간이 추가됩니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>Mixed precision</b><span>FP16/BF16 연산과 필요한 FP32 상태를 조합해 메모리·연산량을 줄입니다.</span></div>
          <div class="concept-card"><b>작은 batch</b><span>activation 메모리를 줄이지만 기울기 잡음과 처리량이 달라집니다.</span></div>
          <div class="concept-card"><b>Gradient accumulation</b><span>여러 작은 배치의 기울기를 모아 큰 유효 배치를 흉내 냅니다.</span></div>
          <div class="concept-card"><b>8-bit optimizer</b><span>옵티마이저 상태의 정밀도를 낮춰 상태 메모리를 줄입니다.</span></div>
        </div>
        <p>GPU 메모리 부족은 모델 가중치만 보고 판단할 수 없습니다. 입력 해상도, 배치 크기, 층별 activation 크기를 함께 계산해야 합니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "generalization-tools", [
    {
      id: "dropout-callback-details",
      kicker: "14 · TRAINING VS INFERENCE",
      title: "Dropout은 훈련 때만 무작위로, 추론 때는 전체 뉴런으로",
      body: S`
        <p><code>Dropout(0.3)</code>은 훈련 스텝마다 출력의 30%를 무작위로 0으로 만들어 특정 경로에만 의존하지 못하게 합니다. Keras는 남은 출력을 적절히 스케일하므로 추론에서는 모든 뉴런을 사용해도 기대값이 맞습니다. 따라서 평가·예측 중에는 dropout이 꺼집니다.</p>
        <p><code>ModelCheckpoint(save_best_only=True)</code>는 검증 손실이 좋아진 시점의 모델을 저장합니다. <code>EarlyStopping(patience=2, restore_best_weights=True)</code>는 두 에포크 동안 개선이 없으면 멈추고 최선의 가중치로 되돌립니다.</p>
        <div class="callout success"><span class="callout-icon">✓</span><div><strong>최종 에포크와 최선의 에포크는 다를 수 있습니다.</strong><p>훈련 손실이 계속 감소해도 검증 손실이 최소였던 시점이 일반화에는 더 좋습니다. 조기 종료는 계산 절감이면서 규제입니다.</p></div></div>
      `
    }
  ]);

  enrich("08-deep-learning", {
    minutes: 58,
    keywords: ["tanh", "Leaky ReLU", "Dense 파라미터", "원-핫", "편미분", "배치", "스텝", "mixed precision", "gradient accumulation", "callback"],
    objectives: ["뉴런의 가중합과 활성화 출력을 수치로 계산한다.", "Dense 층의 출력 형상과 파라미터 수를 계산한다.", "평탄화·정규화·라벨 인코딩과 손실 함수 계약을 설명한다.", "경사·학습률·역전파·옵티마이저의 역할을 구분한다.", "학습 메모리와 훈련/추론 시 Dropout 동작을 설명한다."]
  });

  insertAfter("09-cnn", "convolution", [
    {
      id: "convolution-worked-example",
      kicker: "03 · ONE PATCH AT A TIME",
      title: "합성곱 한 칸은 원소별 곱의 합이다",
      body: S`
        <p>커널을 입력의 작은 패치에 겹치고 같은 위치의 값을 곱해 모두 더한 뒤 편향을 더합니다. 흐림 커널은 주변 평균을, 수직 엣지 커널은 좌우 밝기 차이를 강조합니다. CNN에서는 이 커널 값도 사람이 고정하지 않고 손실을 줄이도록 학습합니다.</p>
      `,
      equation: {
        label: "2차원 단일 채널 합성곱",
        tex: S`Y_{i,j}=\sum_{u=0}^{K_h-1}\sum_{v=0}^{K_w-1}X_{i+u,j+v}W_{u,v}+b`,
        note: "정확히는 딥러닝 라이브러리가 커널을 뒤집지 않는 cross-correlation을 계산하지만 관례적으로 convolution이라 부릅니다."
      },
      afterBody: S`
        <div class="worked-example"><span>WORKED EXAMPLE</span><h3>패치 \(\begin{bmatrix}1&0\\2&1\end{bmatrix}\), 커널 \(\begin{bmatrix}1&-1\\0&1\end{bmatrix}\)</h3><p>출력 한 칸은 \(1(1)+0(-1)+2(0)+1(1)=2\)입니다. 같은 커널을 모든 위치에 공유하므로 어느 위치의 같은 패턴에도 반응합니다.</p></div>
      `
    },
    {
      id: "conv-output-shape",
      kicker: "04 · STRIDE & PADDING",
      title: "패딩은 경계를, 스트라이드는 해상도를 결정한다",
      body: S`
        <p>패딩 \(P\)은 입력 둘레에 값을 추가해 가장자리 정보를 여러 번 보게 하고 출력 크기 감소를 조절합니다. 스트라이드 \(S\)는 커널 이동 간격으로, 커질수록 출력 공간 해상도가 빠르게 줄어듭니다.</p>
      `,
      equation: {
        label: "합성곱 출력 높이와 너비",
        tex: S`H_{\mathrm{out}}=\left\lfloor\frac{H+2P-K_h}{S}\right\rfloor+1,\qquad W_{\mathrm{out}}=\left\lfloor\frac{W+2P-K_w}{S}\right\rfloor+1`,
        note: "28×28 입력, 3×3 커널, stride 1, padding 1이면 출력도 28×28입니다."
      },
      afterBody: S`
        <p><code>padding="same"</code>은 보통 stride 1에서 공간 크기를 유지하도록 패딩을 정합니다. <code>padding="valid"</code>는 패딩 없이 커널이 완전히 겹치는 위치만 계산합니다. 제로 패딩 외에도 반사 패딩이 있지만 모델·문제에 따라 경계 효과가 달라집니다.</p>
      `
    },
    {
      id: "channels-and-filters",
      kicker: "05 · DEPTH",
      title: "필터 하나는 모든 입력 채널을 보고 출력 채널 하나를 만든다",
      body: S`
        <p>RGB 입력의 모양이 \((H,W,3)\)이면 필터 하나의 깊이도 3입니다. 각 채널에서 합성곱한 값을 더해 출력 특징맵 하나를 만듭니다. 필터가 32개면 서로 다른 32개 특징을 찾아 출력 모양은 \((H_{\text{out}},W_{\text{out}},32)\)가 됩니다.</p>
      `,
      equation: {
        label: "Conv2D 파라미터 수",
        tex: S`\#\mathrm{params}=K_hK_wC_{\mathrm{in}}C_{\mathrm{out}}+C_{\mathrm{out}}`,
        note: "3×3, 입력 1채널, 필터 32개면 3×3×1×32+32=320개입니다. 이미지 위치 수와 무관한 이유는 가중치 공유입니다."
      },
      afterBody: S`
        <p>두 번째 합성곱이 입력 32채널에서 필터 64개를 사용한다면 \(3\times3\times32\times64+64=18{,}496\)개입니다. <strong>필터 깊이와 필터 개수</strong>를 구분하면 대부분의 CNN 형상 오류를 피할 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "pooling", [
    {
      id: "pooling-variants",
      kicker: "07 · SUBSAMPLING",
      title: "풀링은 학습할 가중치 없이 공간을 요약한다",
      body: S`
        <p>2×2 최대 풀링은 각 영역의 가장 큰 활성값을 남겨 “이 특징이 근처에 존재한다”는 정보를 보존합니다. 평균 풀링은 평균 반응을 남깁니다. 풀링은 채널별로 독립 적용하므로 채널 수가 바뀌지 않고 학습 파라미터도 없습니다.</p>
        <p>공간 크기를 줄이면 다음 층 계산량과 작은 이동에 대한 민감도가 줄지만 정확한 위치 정보도 잃습니다. 분할·위치 추정처럼 해상도가 중요한 과업에서는 풀링을 신중하게 사용하거나 stride 합성곱과 업샘플링 구조를 사용합니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "architecture", [
    {
      id: "cnn-shape-ledger",
      kicker: "09 · ARCHITECTURE LEDGER",
      title: "Fashion-MNIST CNN을 층별 모양과 계산량으로 읽는다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>층</th><th>출력 모양</th><th>학습 파라미터</th></tr></thead>
          <tbody>
            <tr><td>입력</td><td>28×28×1</td><td>0</td></tr>
            <tr><td>Conv 3×3, 32, same</td><td>28×28×32</td><td>320</td></tr>
            <tr><td>MaxPool 2×2</td><td>14×14×32</td><td>0</td></tr>
            <tr><td>Conv 3×3, 64, same</td><td>14×14×64</td><td>18,496</td></tr>
            <tr><td>MaxPool 2×2</td><td>7×7×64</td><td>0</td></tr>
            <tr><td>Flatten</td><td>3,136</td><td>0</td></tr>
            <tr><td>Dense 100</td><td>100</td><td>313,700</td></tr>
            <tr><td>Dense 10</td><td>10</td><td>1,010</td></tr>
          </tbody>
        </table>
        <p>이 예에서는 합성곱보다 첫 Dense에 훨씬 많은 파라미터가 있습니다. 깊은 CNN이 Global Average Pooling을 사용해 거대한 Flatten–Dense 연결을 줄이는 이유입니다.</p>
        <p>Batch Normalization은 배치 통계와 학습 가능한 스케일·이동을 사용해 중간 활성 분포를 안정화합니다. 훈련과 추론에서 사용하는 통계가 다르므로 Dropout처럼 모드에 따라 동작이 달라지는 층입니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "deployment-contract", [
    {
      id: "cnn-evaluation-loading",
      kicker: "13 · SAVE, LOAD, TEST",
      title: "저장한 모델을 다시 불러와 같은 전처리로 평가한다",
      body: S`
        <p>훈련 중 최선의 검증 모델을 저장하고 다시 로드한 뒤, 먼저 검증 성능이 재현되는지 확인합니다. <code>predict</code>가 반환한 10개 값은 클래스별 확률이며 <code>argmax</code>로 클래스 ID를 얻습니다. 최종 테스트는 모델 선택에 사용하지 않은 데이터로 한 번 수행합니다.</p>
        <ol>
          <li>입력 한 장에도 배치 축을 추가해 \((1,H,W,C)\)로 만듭니다.</li>
          <li>훈련과 같은 색상 순서, 크기 조정, 픽셀 스케일을 사용합니다.</li>
          <li>확률 벡터의 클래스 순서와 라벨 사전을 함께 버전 관리합니다.</li>
          <li>전체 정확도뿐 아니라 어떤 클래스끼리 혼동하는지 확인합니다.</li>
        </ol>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>배포 오류는 모델 밖에서 자주 생깁니다.</strong><p>RGB/BGR 순서, 0~255와 0~1, center crop과 stretch, 클래스 인덱스가 하나만 달라도 훈련 성능과 무관하게 예측이 무너집니다.</p></div></div>
      `
    }
  ]);

  insertAfter("09-cnn", "transfer", [
    {
      id: "fine-tuning-protocol",
      kicker: "15 · TRANSFER PROTOCOL",
      title: "동결 학습 뒤 작은 학습률로 미세조정한다",
      body: S`
        <ol>
          <li>ImageNet으로 학습된 VGG16 같은 기반 모델을 출력 분류기 없이 불러옵니다.</li>
          <li>기반 모델을 동결하고 새 과업의 출력 헤드를 연결합니다.</li>
          <li>새 헤드만 학습해 무작위 가중치가 안정되게 합니다.</li>
          <li>필요하면 뒷부분 층 일부를 해제하고 매우 작은 학습률로 함께 미세조정합니다.</li>
          <li>검증 손실과 과대적합을 보며 조기 종료합니다.</li>
        </ol>
        <p>앞쪽 층은 엣지·색·텍스처처럼 일반적인 특징을, 뒤쪽 층은 원래 데이터셋의 전문적인 조합을 배우는 경향이 있습니다. 새 데이터가 작고 원 과업과 비슷할수록 더 많이 동결하고, 충분히 크고 다를수록 더 많은 층을 조정할 수 있습니다.</p>
        <div class="callout"><span class="callout-icon">η</span><div><strong>왜 미세조정 학습률은 작아야 할까?</strong><p>이미 유용한 표현을 큰 업데이트로 파괴하는 catastrophic forgetting을 줄이기 위해서입니다. 새 헤드가 안정되기 전에 전체 기반 모델을 풀면 무작위 오차가 모든 층을 흔듭니다.</p></div></div>
      `
    }
  ]);

  enrich("09-cnn", {
    minutes: 62,
    keywords: ["cross-correlation", "출력 크기", "다중 채널", "가중치 공유", "Batch Normalization", "Global Average Pooling", "모델 로드", "catastrophic forgetting"],
    objectives: ["합성곱 한 위치의 값과 출력 공간 크기를 계산한다.", "입력 채널·필터·출력 채널 관계와 Conv2D 파라미터 수를 계산한다.", "CNN 전체의 형상 원장과 배포 전처리 계약을 작성한다.", "동결 학습과 미세조정을 순서 있게 수행한다."]
  });

  insertAfter("10-rnn", "sequence", [
    {
      id: "sequence-task-shapes",
      kicker: "02 · SEQUENCE TASKS",
      title: "어느 시점의 출력을 쓰는지가 과업을 결정한다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>형태</th><th>입력→출력</th><th>예</th></tr></thead>
          <tbody>
            <tr><td>Many-to-one</td><td>여러 토큰 → 하나의 출력</td><td>리뷰 감성 분류, 문법 오류 판단</td></tr>
            <tr><td>One-to-many</td><td>하나의 입력 → 시퀀스</td><td>이미지 캡션 생성</td></tr>
            <tr><td>Many-to-many aligned</td><td>각 시점 → 각 시점</td><td>품사 태깅, 프레임별 분류</td></tr>
            <tr><td>Many-to-many shifted</td><td>입력 시퀀스 → 다른 길이 시퀀스</td><td>번역, 문장 생성</td></tr>
          </tbody>
        </table>
        <p>시계열의 각 샘플은 보통 \((T,F)\), 즉 타임스텝 \(T\)개와 시점당 특성 \(F\)개입니다. 배치를 포함하면 \((B,T,F)\)입니다. 텍스트에서는 토큰 ID \((B,T)\)가 임베딩을 지나 \((B,T,E)\)가 됩니다.</p>
      `
    }
  ]);

  insertAfter("10-rnn", "rnn-cell", [
    {
      id: "rnn-equation-params",
      kicker: "04 · RECURRENT CELL",
      title: "같은 가중치를 모든 시간에 공유한다",
      body: S`
        <p>기본 RNN 셀은 현재 입력 \(\mathbf x_t\)와 이전 은닉 상태 \(\mathbf h_{t-1}\)를 합쳐 새 상태를 만듭니다. 같은 \(W_x,W_h,b\)가 모든 타임스텝에 반복 사용되므로 문장 길이가 늘어도 파라미터 수는 늘지 않습니다.</p>
      `,
      equation: {
        label: "기본 RNN 상태와 파라미터 수",
        tex: S`\mathbf h_t=\tanh(\mathbf x_tW_x+\mathbf h_{t-1}W_h+\mathbf b),\qquad \#\mathrm{params}=FH+H^2+H`,
        note: "입력 특성 F=4, 은닉 뉴런 H=3이면 4×3+3×3+3=24개입니다."
      },
      afterBody: S`
        <p>Many-to-one 분류에서는 마지막 상태 \(\mathbf h_T\)를 출력층에 전달해 시퀀스 전체를 요약합니다. 다층 RNN에서는 첫 순환층이 모든 시점의 상태를 다음 순환층에 넘겨야 하므로 <code>return_sequences=True</code>가 필요합니다.</p>
      `
    }
  ]);

  insertAfter("10-rnn", "unrolling", [
    {
      id: "bptt-gradients",
      kicker: "06 · BPTT",
      title: "시간축으로 펼친 뒤 같은 가중치의 기울기를 모두 더한다",
      body: S`
        <p>시간 펼침은 순환 연결을 \(t=1,2,\dots,T\)의 깊은 계산 그래프로 바꿉니다. BPTT(Backpropagation Through Time)는 뒤 시점의 손실에서 앞 시점까지 연쇄법칙을 적용하고, 여러 시점에서 공유한 가중치의 기울기를 합합니다.</p>
        <p>긴 시퀀스에서는 반복된 미분값의 곱이 0에 가까워지는 <strong>기울기 소실</strong> 또는 매우 커지는 <strong>기울기 폭발</strong>이 나타납니다. LSTM·GRU의 게이트와 셀 경로는 장기 정보 전달을 돕고, gradient clipping은 폭발을 제한합니다.</p>
        <div class="callout"><span class="callout-icon">→</span><div><strong>기억은 무제한 저장소가 아닙니다.</strong><p>고정 크기 은닉 상태에 과거를 계속 압축하므로 멀리 떨어진 정보는 사라질 수 있습니다. Attention은 각 과거 위치를 직접 참고하는 다른 해법입니다.</p></div></div>
      `
    }
  ]);

  insertAfter("10-rnn", "embedding", [
    {
      id: "tokenization-padding",
      kicker: "08 · TEXT PIPELINE",
      title: "텍스트를 토큰 ID로 바꾸고 길이를 맞춘다",
      body: S`
        <ol>
          <li><strong>정제:</strong> 대소문자·구두점 처리 규칙을 정하되 필요한 의미를 지우지 않습니다.</li>
          <li><strong>토큰화:</strong> 단어 또는 부분단어를 사전의 정수 ID로 바꿉니다.</li>
          <li><strong>OOV 처리:</strong> 사전에 없는 토큰을 전용 ID로 보냅니다.</li>
          <li><strong>패딩·자르기:</strong> 배치의 길이를 맞추고 실제 토큰과 패딩을 mask로 구분합니다.</li>
          <li><strong>임베딩:</strong> 각 ID를 학습 가능한 \(E\)차원 벡터로 조회합니다.</li>
        </ol>
        <p>원-핫 벡터는 사전 크기만큼 길고 모든 서로 다른 단어의 거리가 같습니다. 임베딩 행렬 \(V\times E\)는 학습을 통해 비슷한 문맥의 단어를 가까운 벡터로 배치합니다. 토큰 ID 자체의 숫자 크기에는 의미가 없습니다.</p>
        <div class="worked-example"><span>SHAPE FLOW</span><h3>배치 32, 길이 20, 임베딩 100</h3><p>토큰 입력 \((32,20)\)이 Embedding을 지나 \((32,20,100)\)이 됩니다. 뉴런 10개의 RNN이 마지막 상태만 내면 \((32,10)\), 이진 Dense 출력은 \((32,1)\)입니다.</p></div>
      `
    }
  ]);

  insertAfter("10-rnn", "lstm-gru", [
    {
      id: "lstm-gates",
      kicker: "10 · GATED MEMORY",
      title: "LSTM은 지울 것·쓸 것·읽을 것을 따로 결정한다",
      body: S`
        <p>LSTM은 은닉 상태 \(h_t\) 외에 셀 상태 \(c_t\)를 유지합니다. 시그모이드 게이트의 0~1 값이 정보 통과량을 조절하고, 후보 기억은 tanh로 만듭니다.</p>
      `,
      equation: {
        label: "LSTM의 핵심 게이트",
        tex: S`f_t=\sigma(W_f[x_t,h_{t-1}]+b_f),\quad i_t=\sigma(W_i[x_t,h_{t-1}]+b_i),\quad \tilde c_t=\tanh(W_c[x_t,h_{t-1}]+b_c)`,
        note: "fₜ는 과거 기억을 얼마나 남길지, iₜ는 새 후보를 얼마나 쓸지 정합니다."
      },
      afterBody: S`
        <p>\(c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t\)로 기억을 갱신하고, 출력 게이트 \(o_t\)로 \(h_t=o_t\odot\tanh(c_t)\)를 만듭니다. 덧셈 중심의 셀 경로가 긴 거리의 기울기 전달을 돕습니다.</p>
        <p>GRU는 셀 상태와 은닉 상태를 합치고 update·reset 게이트로 단순화해 파라미터가 적습니다. 어느 쪽이 항상 우월한 것은 아니므로 데이터 크기, 속도, 검증 성능으로 선택합니다.</p>
      `
    }
  ]);

  insertAfter("10-rnn", "headline-generation", [
    {
      id: "generation-decoding",
      kicker: "12 · FROM TRAINING TO GENERATION",
      title: "다음 단어 예측을 반복하면 문장이 된다",
      body: S`
        <p>“deep learning changes”라는 문장에서 접두사–타깃 쌍은 “deep”→“learning”, “deep learning”→“changes”처럼 만듭니다. 서로 다른 길이의 접두사를 앞쪽 패딩으로 맞추고 마지막 열을 정답 다음 토큰으로 분리합니다.</p>
        <p>생성할 때는 시작 문장을 토큰화·패딩해 다음 토큰 분포를 얻고, 선택한 토큰을 문장 끝에 붙여 다시 입력합니다. 매번 가장 큰 확률만 고르는 greedy decoding은 안정적이지만 반복적일 수 있습니다.</p>
      `,
      equation: {
        label: "Temperature로 분포 조절",
        tex: S`p_i(T)=\frac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}`,
        note: "T<1이면 높은 확률에 더 집중해 보수적이고, T>1이면 분포가 평평해져 다양하지만 오류도 늘 수 있습니다."
      },
      afterBody: S`
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>생성은 사실 검색 과정입니다.</strong><p>모델은 각 단계의 조건부 확률을 제공합니다. 어떤 토큰을 선택하고 언제 멈출지는 greedy, sampling, top-k 같은 디코딩 정책이 정합니다.</p></div></div>
      `
    }
  ]);

  enrich("10-rnn", {
    minutes: 56,
    keywords: ["many-to-one", "many-to-many", "BPTT", "기울기 폭발", "gradient clipping", "OOV", "masking", "LSTM gate", "GRU", "temperature", "decoding"],
    objectives: ["시퀀스 과업을 입출력 시점 수로 분류하고 텐서 형상을 계산한다.", "기본 RNN의 상태식과 파라미터 수를 계산한다.", "토큰화·패딩·임베딩과 LSTM 게이트를 설명한다.", "다음 토큰 학습과 생성 시 디코딩의 차이를 구분한다."]
  });

  insertAfter("11-dli-practicum", "lab-ladder", [
    {
      id: "jupyter-gpu-workflow",
      kicker: "02 · WORKSPACE",
      title: "JupyterLab의 커널은 상태를 기억하고 GPU 메모리도 점유한다",
      body: S`
        <p>노트북 셀은 위에서 아래로 읽히지만 실행 순서는 사용자가 누른 순서입니다. 앞 셀을 수정하고 아래 셀만 다시 실행하면 화면의 코드와 메모리 상태가 어긋날 수 있습니다. 결과를 재현하려면 커널을 재시작하고 처음부터 전체 실행해도 같은 결과가 나와야 합니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>Kernel restart</b><span>Python 변수와 프레임워크 상태를 초기화합니다.</span></div>
          <div class="concept-card"><b>Clear session</b><span>Keras가 쌓아 둔 모델 그래프와 이름 상태를 비웁니다.</span></div>
          <div class="concept-card"><b>GPU 확인</b><span>프레임워크가 GPU를 인식하는지, 메모리 사용량이 비정상적으로 남는지 봅니다.</span></div>
          <div class="concept-card"><b>Restart & run all</b><span>숨은 실행 순서 의존성을 찾는 최종 재현성 검사입니다.</span></div>
        </div>
        <p>GPU는 행렬 연산을 대량 병렬화하지만 데이터 로딩·작은 모델·잦은 Python 작업이 병목이면 항상 빨라지는 것은 아닙니다.</p>
      `
    }
  ]);

  insertAfter("11-dli-practicum", "jupyter-gpu-workflow", [
    {
      id: "containers-and-environment",
      kicker: "03 · REPRODUCIBLE ENVIRONMENT",
      title: "컨테이너는 코드뿐 아니라 실행 환경도 함께 고정한다",
      body: S`
        <p>딥러닝 결과는 Python 코드만으로 재현되지 않을 수 있습니다. CUDA·cuDNN, 프레임워크, 드라이버와 라이브러리 버전의 조합이 맞아야 합니다. Docker 컨테이너는 필요한 사용자 공간 라이브러리와 설정을 이미지로 묶어 같은 환경을 다시 실행하게 합니다.</p>
        <p>NVIDIA NGC의 딥러닝 컨테이너는 프레임워크와 GPU 라이브러리를 검증된 조합으로 제공하고, 워크스테이션·서버·클라우드에서 같은 이미지를 사용할 수 있게 합니다. 호스트의 NVIDIA 드라이버와 컨테이너 런타임은 별도로 호환되어야 합니다.</p>
        <div class="concept-grid">
          <div class="concept-card"><b>Image</b><span>읽기 전용 실행 환경의 설계도. 태그나 digest로 버전을 고정합니다.</span></div>
          <div class="concept-card"><b>Container</b><span>이미지에서 시작한 실행 인스턴스. 삭제될 수 있으므로 결과는 볼륨에 둡니다.</span></div>
          <div class="concept-card"><b>Volume</b><span>노트북·모델·결과를 컨테이너 밖에 지속적으로 보관합니다.</span></div>
          <div class="concept-card"><b>Port</b><span>컨테이너의 Jupyter 서버를 브라우저에서 접근하게 연결합니다.</span></div>
        </div>
        <p>재현성을 위해 이미지 버전, 패키지 목록, 랜덤 시드와 데이터 버전을 함께 기록합니다. 단, 컨테이너에 원본 강의자료나 비밀 키를 복사하지 않습니다.</p>
      `
    }
  ]);

  insertAfter("11-dli-practicum", "shape-ledger", [
    {
      id: "compile-contract-matrix",
      kicker: "04 · COMPILE CONTRACT",
      title: "실습이 바뀌어도 네 가지 질문은 반복된다",
      body: S`
        <ol>
          <li><strong>입력:</strong> 배치 하나의 shape와 값 범위는 무엇인가?</li>
          <li><strong>출력:</strong> 마지막 층의 유닛 수와 활성화는 무엇인가?</li>
          <li><strong>타깃:</strong> 정수, 원-핫, 이진값 중 어떤 형식인가?</li>
          <li><strong>목표:</strong> 그 출력·타깃 조합을 비교할 손실은 무엇인가?</li>
        </ol>
        <table class="comparison-table">
          <thead><tr><th>실습</th><th>대표 입력</th><th>출력/손실</th></tr></thead>
          <tbody>
            <tr><td>MNIST</td><td>(B, 784), 0~1</td><td>10 softmax / categorical CE</td></tr>
            <tr><td>ASL CNN</td><td>(B, 28, 28, 1)</td><td>24 softmax / categorical CE</td></tr>
            <tr><td>특정 강아지</td><td>VGG 전처리 이미지</td><td>이진 출력 / binary CE</td></tr>
            <tr><td>헤드라인</td><td>(B, T) 토큰 ID</td><td>사전 크기 softmax / categorical CE</td></tr>
            <tr><td>과일 평가</td><td>컬러 이미지 배치</td><td>6 클래스 출력 / 라벨 형식 대응 CE</td></tr>
          </tbody>
        </table>
        <p><code>model.summary()</code>, 한 배치의 <code>shape</code>, 타깃 한 행, 훈련 전 순전파 출력 네 가지를 확인하면 긴 훈련 뒤 발견할 오류를 몇 초 안에 잡을 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("11-dli-practicum", "asl-generalization", [
    {
      id: "diagnose-before-tuning",
      kicker: "06 · DIAGNOSE FIRST",
      title: "정확도가 막히면 곡선의 모양부터 진단한다",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>관찰</th><th>가능한 원인</th><th>먼저 할 일</th></tr></thead>
          <tbody>
            <tr><td>훈련·검증 모두 낮음</td><td>과소적합, 잘못된 입력·라벨, 학습 실패</td><td>작은 배치를 외울 수 있는지와 shape·loss 확인</td></tr>
            <tr><td>훈련 높고 검증 낮음</td><td>과대적합, 데이터 분포 차이</td><td>CNN 귀납 편향, 증강, 규제, 데이터 점검</td></tr>
            <tr><td>손실이 NaN</td><td>값 범위, 큰 학습률, 수치 오류</td><td>입력 최솟값·최댓값, loss 설정, 학습률 확인</td></tr>
            <tr><td>한 클래스만 예측</td><td>라벨 매핑, 불균형, 출력·손실 불일치</td><td>클래스 빈도와 예측 분포, 라벨 사전 확인</td></tr>
          </tbody>
        </table>
        <p>하이퍼파라미터를 무작정 바꾸기 전에 <strong>작은 데이터 10~100개를 거의 완벽히 외울 수 있는가</strong>를 확인하면 구현 문제와 일반화 문제를 분리할 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("11-dli-practicum", "fruit-assessment", [
    {
      id: "assessment-checklist",
      kicker: "09 · FINAL CHECKLIST",
      title: "과일 평가는 정확도 숫자보다 완전한 학습 파이프라인을 묻는다",
      body: S`
        <ol>
          <li>VGG16 기반 모델의 기대 입력 크기와 전처리를 맞춥니다.</li>
          <li>기반 모델을 동결한 상태에서 6개 클래스에 맞는 새 헤드를 학습합니다.</li>
          <li>과일의 의미를 훼손하지 않는 증강을 훈련에만 적용합니다.</li>
          <li>검증 성능이 안정된 뒤 일부 층을 해제하고 작은 학습률로 미세조정합니다.</li>
          <li>평가 데이터 생성기가 훈련 생성기와 같은 클래스 인덱스 순서를 쓰는지 확인합니다.</li>
          <li>목표 검증 정확도뿐 아니라 오분류 이미지와 클래스별 표본 수를 확인합니다.</li>
        </ol>
        <p>이 단계는 새 아키텍처 암기 시험이 아닙니다. 데이터 형상, 출력·손실 계약, 일반화, 전이학습, 평가를 한 시스템으로 조립할 수 있는지 확인합니다.</p>
      `
    }
  ]);

  enrich("11-dli-practicum", {
    minutes: 34,
    keywords: ["커널 재시작", "재현성", "compile contract", "NaN", "small-batch overfit", "평가 체크리스트"],
    objectives: ["Jupyter 커널 상태와 GPU 메모리를 재현 가능한 방식으로 관리한다.", "각 실습의 입력·출력·타깃·손실 계약을 표로 검증한다.", "학습 곡선의 패턴에서 구현 오류와 과대·과소적합을 구분한다."]
  });

  insertAfter("12-anomaly", "define-anomaly", [
    {
      id: "base-rate-imbalance",
      kicker: "02 · BASE RATE",
      title: "이상이 0.1%라면 정확도 99.9%도 무의미할 수 있다",
      body: S`
        <p>10만 건 중 이상이 100건일 때 모두 정상이라고 예측하면 정확도는 99.9%지만 이상을 하나도 찾지 못합니다. 이상 탐지에서는 양성 클래스의 희귀함과 오류 비용을 반영해 정밀도·재현율·PR-AUC를 봅니다.</p>
      `,
      equation: {
        label: "경보 품질의 두 축",
        tex: S`\mathrm{precision}=\frac{TP}{TP+FP},\qquad \mathrm{recall}=\frac{TP}{TP+FN}`,
        note: "정밀도는 울린 경보 중 진짜 비율, 재현율은 실제 이상 중 잡아낸 비율입니다."
      },
      afterBody: S`
        <p>보안에서는 거짓 경보가 너무 많으면 분석가가 지치고, 의료에서는 놓친 이상이 더 치명적일 수 있습니다. 따라서 하나의 ‘최고 정확도’보다 운영 가능한 경보 수와 놓침 비용의 균형이 중요합니다.</p>
      `
    }
  ]);

  insertAfter("12-anomaly", "choose-method", [
    {
      id: "threshold-calibration",
      kicker: "04 · SCORE TO DECISION",
      title: "모델은 점수를 만들고 운영 정책이 임곗값을 정한다",
      body: S`
        <p>XGBoost의 양성 확률, 오토인코더의 재구성 오차, GAN 판별 점수는 방향과 스케일이 서로 다르지만 모두 <strong>이상 점수</strong>로 정리할 수 있습니다. 검증 데이터에서 임곗값 \(\tau\)를 바꾸며 혼동행렬과 비용을 계산합니다.</p>
        <p>라벨이 충분하면 원하는 재현율이나 F1, 기대 비용을 기준으로 정합니다. 라벨이 거의 없으면 정상 검증 점수의 상위 99.5백분위처럼 경보 예산을 기준으로 시작하고 운영 중 확인된 사례로 보정합니다.</p>
        <div class="callout warning"><span class="callout-icon">!</span><div><strong>테스트에서 임곗값을 고르면 최종 평가가 아닙니다.</strong><p>모델 파라미터뿐 아니라 임곗값도 검증으로 선택하는 하이퍼파라미터입니다.</p></div></div>
      `
    }
  ]);

  insertAfter("12-anomaly", "autoencoder", [
    {
      id: "autoencoder-threshold",
      kicker: "07 · RECONSTRUCTION",
      title: "오토인코더는 복원이 어려운 정도를 이상 점수로 쓴다",
      body: S`
        <p>인코더 \(z=f_\theta(x)\)는 입력을 병목 표현으로 압축하고 디코더 \(\hat x=g_\phi(z)\)는 복원합니다. 정상 데이터로만 충분히 학습하면 정상 구조는 잘 복원하고 다른 생성 과정의 입력은 큰 오차를 낼 것이라 기대합니다.</p>
      `,
      equation: {
        label: "샘플별 재구성 오차",
        tex: S`s(x)=\frac1p\sum_{j=1}^{p}(x_j-\hat x_j)^2,\qquad \mathrm{anomaly}(x)=\mathbb 1[s(x)>\tau]`,
        note: "입력 특성 스케일이 다르면 큰 단위의 특성이 오차를 지배하므로 전처리와 손실 설계가 중요합니다."
      },
      afterBody: S`
        <p>용량이 지나치게 큰 오토인코더는 이상도 그대로 복사할 수 있고, 정상 훈련 데이터가 오염되면 이상 패턴까지 학습합니다. 병목 크기, 규제, contamination, 시간에 따른 정상 분포 변화를 점검해야 합니다.</p>
      `
    }
  ]);

  enrich("12-anomaly", {
    minutes: 24,
    keywords: ["base rate", "정밀도", "재현율", "PR-AUC", "경보 예산", "contamination", "재구성 임곗값"],
    objectives: ["희귀 이상에서 정확도가 실패하는 이유를 혼동행렬로 설명한다.", "이상 점수와 운영 임곗값을 분리해 검증 데이터로 선택한다.", "오토인코더 재구성 오차의 가정과 실패 조건을 설명한다."]
  });

  window.THEORY_COVERAGE = {
    sourcePages: 516,
    sourceNotebooks: 20,
    originalFilesBundled: 0,
    topics: chapters.reduce((sum, item) => sum + item.sections.length, 0),
    minutes: chapters.reduce((sum, item) => sum + item.minutes, 0),
    checks: chapters.reduce((sum, item) => sum + item.quiz.length, 0)
  };
})();
