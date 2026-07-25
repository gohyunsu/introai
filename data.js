/* Public, hand-written learning content. No original lecture files are bundled. */
(() => {
  const S = String.raw;

  window.CHAPTERS = [
    {
      id: "01-ai-map",
      num: "01",
      phase: "foundation",
      phaseLabel: "기반",
      shortTitle: "AI의 지도",
      title: "AI라는 넓은 지도를 먼저 펼치기",
      subtitle: "자동화, 머신러닝, 딥러닝, 생성 모델의 관계를 구분하고 ‘학습하는 시스템’의 공통 구조를 잡습니다.",
      summary: "AI·ML·딥러닝의 포함 관계, 역사, 문제 정의의 중요성",
      question: "컴퓨터가 규칙을 직접 만들게 하려면 무엇을 보여 주어야 할까?",
      minutes: 28,
      keywords: ["인공지능", "머신러닝", "딥러닝", "생성형 AI", "역사", "문제 정의", "일반화"],
      objectives: [
        "AI, 머신러닝, 딥러닝을 범위와 학습 방식으로 구분한다.",
        "데이터·모델·목표·평가로 이어지는 공통 학습 루프를 설명한다.",
        "AI 프로젝트에서 문제 정의가 알고리즘 선택보다 앞서는 이유를 말한다."
      ],
      sections: [
        {
          id: "nested-map",
          kicker: "01 · SCOPE",
          title: "AI 안에 머신러닝, 그 안에 딥러닝",
          body: `
            <p><strong>인공지능(AI)</strong>은 사람이 지능적이라고 부르는 일을 기계가 수행하게 만드는 가장 넓은 목표입니다. 규칙 기반 전문가 시스템, 탐색, 계획, 최적화처럼 데이터에서 배우지 않는 방법도 AI에 포함됩니다.</p>
            <p><strong>머신러닝(ML)</strong>은 그중에서도 사례를 보고 규칙을 조정하는 접근입니다. 사람이 “길이 30cm 이상이면 도미”라는 규칙을 직접 쓰는 대신, 길이·무게와 정답이 붙은 표본을 주고 결정 규칙을 데이터에서 찾게 합니다. <strong>딥러닝</strong>은 여러 층의 인공신경망으로 특징 표현과 판단 규칙을 함께 학습하는 머신러닝의 한 갈래입니다.</p>
            <div class="concept-grid">
              <div class="concept-card"><b>AI · 목표의 범위</b><span>추론, 계획, 인식, 생성, 로보틱스 등 지능적 행동 전체</span></div>
              <div class="concept-card"><b>ML · 규칙을 얻는 방식</b><span>데이터와 목표를 이용해 모델의 파라미터를 조정</span></div>
              <div class="concept-card"><b>Deep Learning · 표현 학습</b><span>원시 입력에서 유용한 특징까지 신경망이 계층적으로 학습</span></div>
              <div class="concept-card"><b>Generative AI · 출력의 성격</b><span>학습한 분포를 이용해 텍스트·이미지·소리 같은 새 표본을 생성</span></div>
            </div>
            <div class="callout"><span class="callout-icon">≠</span><div><strong>생성형 AI는 딥러닝의 동의어가 아닙니다.</strong><p>딥러닝은 모델을 만드는 방법이고, 생성은 모델이 수행하는 과업의 성격입니다. 딥러닝으로 분류 모델도, 생성 모델도 만들 수 있습니다.</p></div></div>
          `
        },
        {
          id: "reverse-thinking",
          kicker: "02 · PARADIGM",
          title: "프로그램을 쓰는 대신, 프로그램을 학습시킨다",
          body: `
            <p>전통적 프로그래밍은 <strong>데이터 + 사람이 만든 규칙 → 결과</strong>의 흐름을 가집니다. 하지만 고양이 얼굴의 모든 가능한 모양이나 손글씨 숫자의 모든 변형을 규칙으로 열거하기는 어렵습니다. 머신러닝은 방향을 뒤집어 <strong>데이터 + 원하는 결과 → 규칙을 담은 모델</strong>을 얻습니다.</p>
            <p>학습 데이터의 표본을 \\((x_i, y_i)\\)라고 합시다. 세상의 참된 관계 \\(f\\)를 직접 알 수 없으므로, 표본에서 잘 맞는 근사 함수 \\(h_\\theta\\)를 찾습니다. 여기서 \\(\\theta\\)는 이웃 수, 직선의 계수, 신경망 가중치처럼 모델이 예측할 때 사용하는 값입니다.</p>
          `,
          equation: {
            label: "학습을 함수 근사로 보기",
            tex: S`\mathcal{S}=\{(x_i,y_i)\}_{i=1}^{n}, \qquad \hat{\theta}=\arg\min_{\theta}\frac{1}{n}\sum_{i=1}^{n}\ell\!\left(y_i,h_{\theta}(x_i)\right)`,
            note: "손실 ℓ은 예측과 정답의 차이를 수치화합니다. 학습은 평균 손실을 작게 만드는 파라미터를 찾는 과정입니다."
          }
        },
        {
          id: "history",
          kicker: "03 · HISTORY",
          title: "아이디어보다 환경이 늦게 도착했다",
          body: `
            <p>튜링의 질문, 퍼셉트론, 역전파, 합성곱 신경망, LSTM, GAN, Transformer는 서로 단절된 유행이 아닙니다. <strong>표현·학습·계산</strong>의 한계를 하나씩 푼 연속선입니다. 초기 신경망의 핵심 아이디어는 오래되었지만 대규모 데이터, GPU 병렬 연산, 안정적인 최적화 기법이 모이기 전에는 충분히 깊고 큰 모델을 학습시키기 어려웠습니다.</p>
            <table class="comparison-table">
              <thead><tr><th>전환점</th><th>풀고자 한 문제</th><th>이어지는 개념</th></tr></thead>
              <tbody>
                <tr><td>퍼셉트론</td><td>입력의 가중합으로 결정을 만들기</td><td>선형 분류, 뉴런</td></tr>
                <tr><td>역전파</td><td>여러 층의 가중치에 오차 책임을 배분하기</td><td>심층 신경망 학습</td></tr>
                <tr><td>CNN / LSTM</td><td>이미지의 공간 구조, 시퀀스의 시간 구조 활용하기</td><td>귀납적 편향</td></tr>
                <tr><td>GAN / Transformer</td><td>분포를 생성하고 긴 범위의 관계를 모델링하기</td><td>생성·멀티모달 모델</td></tr>
              </tbody>
            </table>
          `
        },
        {
          id: "problem-first",
          kicker: "04 · PRACTICE",
          title: "가장 먼저 정할 것은 알고리즘이 아니다",
          body: `
            <p>좋은 AI 프로젝트는 “최신 모델을 써 보자”가 아니라 <strong>어떤 결정을 더 잘하고 싶은가</strong>에서 시작합니다. 입력 가능한 정보, 원하는 출력, 오답의 비용, 실제 사용 환경을 먼저 정해야 필요한 데이터와 평가 지표가 보입니다.</p>
            <ol>
              <li><strong>문제:</strong> 예측이 필요한가, 그룹을 발견해야 하는가, 새 표본을 생성해야 하는가?</li>
              <li><strong>데이터:</strong> 배포 환경을 대표하며, 정답은 일관되고, 누출된 미래 정보는 없는가?</li>
              <li><strong>모델:</strong> 성능뿐 아니라 설명 가능성, 지연 시간, 메모리 제약에 맞는가?</li>
              <li><strong>평가:</strong> 정확도 하나가 실제 실패 비용을 반영하는가?</li>
            </ol>
            <div class="callout success"><span class="callout-icon">→</span><div><strong>다음 질문</strong><p>‘비슷한 것은 같은 종류일 것’이라는 가장 단순한 가정만으로도 분류할 수 있을까요? K-NN에서 첫 모델을 만듭니다.</p></div></div>
          `
        }
      ],
      interactive: {
        type: "timeline",
        title: "아이디어의 계보 탐색기",
        instruction: "연도를 움직여 어떤 한계가 다음 모델을 불러왔는지 살펴보세요."
      },
      quiz: [
        {
          q: "딥러닝과 머신러닝의 관계를 가장 정확히 설명한 것은?",
          options: ["서로 완전히 다른 분야다.", "딥러닝은 머신러닝의 한 갈래다.", "머신러닝은 딥러닝의 한 층이다."],
          answer: 1,
          why: "딥러닝은 다층 인공신경망을 사용하는 머신러닝 방법입니다."
        },
        {
          q: "머신러닝에서 일반화란 무엇인가?",
          options: ["훈련 데이터를 완벽히 외우는 것", "보지 않은 데이터에서도 유용한 예측을 하는 것", "모든 모델을 하나로 합치는 것"],
          answer: 1,
          why: "학습의 목적은 훈련 표본 자체가 아니라 같은 분포에서 올 새 표본에 잘 작동하는 규칙을 얻는 것입니다."
        },
        {
          q: "AI 프로젝트의 가장 자연스러운 첫 단계는?",
          options: ["가장 큰 신경망 선택", "GPU 구매", "문제와 성공 기준 정의"],
          answer: 2,
          why: "문제와 실패 비용을 알아야 데이터, 모델, 지표를 올바르게 선택할 수 있습니다."
        }
      ],
      sources: [
        ["Google Machine Learning Crash Course", "https://developers.google.com/machine-learning/crash-course"],
        ["A Few Useful Things to Know about Machine Learning", "https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf"]
      ]
    },
    {
      id: "02-ml-knn",
      num: "02",
      phase: "foundation",
      phaseLabel: "기반",
      shortTitle: "ML과 K-NN",
      title: "가장 가까운 이웃에게 답을 묻다",
      subtitle: "분류·회귀·군집이라는 과업을 구분하고, K-NN으로 fit–score–predict의 첫 학습 루프를 완성합니다.",
      summary: "지도·비지도·강화학습, 분류와 회귀, K-최근접 이웃",
      question: "‘가깝다’는 가정만으로 새로운 생선을 구분할 수 있을까?",
      minutes: 36,
      keywords: ["지도학습", "비지도학습", "강화학습", "분류", "회귀", "군집", "K-NN", "유클리드 거리", "하이퍼파라미터"],
      objectives: [
        "분류·회귀·군집을 출력과 정답의 유무로 구분한다.",
        "K-NN 분류의 거리 계산과 다수결 과정을 설명한다.",
        "k가 결정 경계와 편향–분산에 주는 영향을 예측한다."
      ],
      sections: [
        {
          id: "tasks-methods",
          kicker: "01 · TAXONOMY",
          title: "과업과 학습 방식은 서로 다른 축이다",
          body: `
            <p><strong>과업(task)</strong>은 원하는 출력의 형태입니다. 분류는 미리 정한 범주, 회귀는 연속적인 수치, 군집은 데이터 안의 비슷한 그룹을 찾습니다. <strong>학습 방식(method)</strong>은 어떤 피드백으로 배울지를 말합니다.</p>
            <table class="comparison-table">
              <thead><tr><th>방식</th><th>주어지는 정보</th><th>대표 과업</th><th>핵심 질문</th></tr></thead>
              <tbody>
                <tr><td>지도학습</td><td>입력 \\(x\\) + 정답 \\(y\\)</td><td>분류, 회귀</td><td>이 입력의 정답은?</td></tr>
                <tr><td>비지도학습</td><td>입력 \\(x\\)만</td><td>군집, 차원 축소</td><td>데이터의 구조는?</td></tr>
                <tr><td>강화학습</td><td>상태, 행동, 보상</td><td>순차적 의사결정</td><td>장기 보상을 키울 행동은?</td></tr>
              </tbody>
            </table>
            <div class="callout"><span class="callout-icon">i</span><div><strong>로지스틱 ‘회귀’는 주로 분류에 씁니다.</strong><p>이름은 회귀지만 출력한 확률을 임곗값과 비교해 클래스를 정합니다. 알고리즘의 이름과 과업 이름을 분리해서 보세요.</p></div></div>
          `
        },
        {
          id: "knn-intuition",
          kicker: "02 · ALGORITHM",
          title: "K-NN은 학습 데이터를 기억한다",
          body: `
            <p>도미와 빙어의 길이·무게를 좌표로 그리면 비슷한 생선끼리 가까이 모입니다. K-NN은 새 점과 모든 훈련 점 사이의 거리를 계산하고, 가까운 \\(k\\)개 이웃의 표를 모아 가장 많은 클래스를 선택합니다.</p>
            <p>명시적인 직선이나 복잡한 파라미터를 미리 학습하지 않기 때문에 훈련은 거의 저장에 가깝습니다. 대신 예측할 때 거리를 계산해야 하므로 데이터가 커질수록 느리고 메모리를 많이 씁니다. 이런 모델을 <strong>사례 기반·비모수 모델</strong>이라고 부릅니다.</p>
          `,
          equation: {
            label: "유클리드 거리와 다수결",
            tex: S`d(x,x_i)=\sqrt{\sum_{j=1}^{p}(x_j-x_{ij})^2}, \qquad \hat y=\operatorname{mode}\{y_i:i\in N_k(x)\}`,
            note: "p는 특성 수, Nₖ(x)는 새 점 x에 가장 가까운 k개 훈련 표본의 집합입니다."
          }
        },
        {
          id: "k-bias-variance",
          kicker: "03 · HYPERPARAMETER",
          title: "k는 얼마나 넓게 주변을 볼지 정한다",
          body: `
            <p>작은 \\(k\\)는 아주 가까운 국지 패턴에 민감합니다. 복잡한 경계를 표현하지만 잡음 한 점에도 결과가 바뀌기 쉽습니다. 큰 \\(k\\)는 넓은 지역의 평균적 패턴을 보아 경계가 매끄럽지만, 소수 클래스나 작은 구조를 지울 수 있습니다.</p>
            <div class="concept-grid">
              <div class="concept-card"><b>작은 k · 낮은 편향, 높은 분산</b><span>훈련 데이터에 민감하고 복잡한 결정 경계. 과대적합 위험.</span></div>
              <div class="concept-card"><b>큰 k · 높은 편향, 낮은 분산</b><span>매끄럽고 안정적이지만 중요한 국소 패턴을 놓칠 수 있음.</span></div>
            </div>
            <p>\\(k=49\\)처럼 전체 샘플을 이웃으로 사용하면 언제나 다수 클래스만 예측합니다. 정확도 35/49는 모델이 잘 배운 결과가 아니라 <strong>클래스 비율을 그대로 말한 것</strong>입니다.</p>
          `
        },
        {
          id: "fit-api",
          kicker: "04 · CODE",
          title: "fit–score–predict: 앞으로 반복될 세 동사",
          body: `
            <p>scikit-learn의 일관된 API는 알고리즘이 바뀌어도 실험의 골격을 유지합니다. <code>fit</code>은 훈련 데이터로 상태를 만들고, <code>score</code>는 입력과 정답으로 성능을 계산하며, <code>predict</code>는 새 입력의 출력을 냅니다.</p>
          `,
          code: {
            title: "K-NN 이진 분류의 최소 골격",
            content: `from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5)
model.fit(train_input, train_target)

accuracy = model.score(test_input, test_target)
prediction = model.predict([[30, 600]])`
          }
        }
      ],
      interactive: {
        type: "knn",
        title: "K-NN 이웃 투표 실험",
        instruction: "k를 바꾸고 캔버스를 눌러 새 표본의 분류와 경계 변화를 확인하세요."
      },
      quiz: [
        {
          q: "K-NN 분류에서 k를 지나치게 크게 하면 가장 흔한 현상은?",
          options: ["훈련 표본 하나의 잡음만 따라간다.", "다수 클래스 중심의 지나치게 단순한 예측이 된다.", "거리를 계산하지 않게 된다."],
          answer: 1,
          why: "많은 이웃을 평균내면 국소 구조가 사라지고 다수 클래스의 영향이 커집니다."
        },
        {
          q: "타깃 y 없이 고객 안의 자연스러운 그룹을 찾는 과업은?",
          options: ["회귀", "군집", "강화학습"],
          answer: 1,
          why: "군집은 라벨 없이 비슷한 표본을 그룹화하는 대표적인 비지도학습 과업입니다."
        },
        {
          q: "K-NN이 ‘비모수 모델’인 이유와 가장 가까운 설명은?",
          options: ["데이터를 하나의 고정된 계수 집합으로 요약하지 않고 표본을 기억한다.", "하이퍼파라미터가 전혀 없다.", "확률을 절대 계산하지 않는다."],
          answer: 0,
          why: "K-NN은 고정된 함수 형태의 계수를 추정하기보다 훈련 표본 자체를 예측에 사용합니다."
        }
      ],
      sources: [
        ["scikit-learn Nearest Neighbors", "https://scikit-learn.org/stable/modules/neighbors.html"],
        ["UCI Fish Market data mirror", "https://www.kaggle.com/datasets/aungpyaeap/fish-market"]
      ]
    },
    {
      id: "03-data",
      num: "03",
      phase: "foundation",
      phaseLabel: "기반",
      shortTitle: "데이터 다루기",
      title: "모델보다 먼저 데이터를 의심하기",
      subtitle: "훈련·검증·테스트 분리, 샘플링 편향, 스케일링, 증강과 탐색을 일반화라는 한 목표로 연결합니다.",
      summary: "데이터 분할, 샘플링 편향, 표준화, 증강, 탐색적 분석",
      question: "훈련 점수 100%는 왜 좋은 소식이 아닐 수 있을까?",
      minutes: 42,
      keywords: ["훈련 세트", "검증 세트", "테스트 세트", "샘플링 편향", "표준화", "데이터 증강", "데이터 누출", "EDA"],
      objectives: [
        "훈련·검증·테스트 세트의 서로 다른 역할을 설명한다.",
        "K-NN에서 특성 스케일이 거리와 예측을 왜곡하는 과정을 이해한다.",
        "데이터 증강과 탐색적 분석이 일반화에 기여하는 방식을 구분한다."
      ],
      sections: [
        {
          id: "split",
          kicker: "01 · GENERALIZATION",
          title: "평가는 아직 보지 않은 데이터로",
          body: `
            <p>모델이 훈련 표본을 잘 맞히는 것은 최소 조건일 뿐입니다. 우리가 원하는 것은 같은 현실에서 들어올 <strong>새 표본</strong>에 대한 성능입니다. 따라서 데이터 일부를 모델이 보지 못하게 남겨 두어야 합니다.</p>
            <div class="concept-grid">
              <div class="concept-card"><b>훈련 세트</b><span>모델 파라미터를 학습합니다.</span></div>
              <div class="concept-card"><b>검증 세트</b><span>모델·하이퍼파라미터 선택과 조기 종료에 씁니다.</span></div>
              <div class="concept-card"><b>테스트 세트</b><span>모든 선택이 끝난 뒤 일반화 성능을 한 번 추정합니다.</span></div>
              <div class="concept-card"><b>미래·외부 데이터</b><span>배포 후 마주칠 실제 분포. 시간이 지나면 달라질 수 있습니다.</span></div>
            </div>
            <div class="callout warning"><span class="callout-icon">!</span><div><strong>테스트 점수를 보며 모델을 고치면 테스트가 검증 세트가 됩니다.</strong><p>반복해서 들여다본 정보도 학습에 이용한 정보입니다. 최종 성능 추정이 낙관적으로 변합니다.</p></div></div>
          `
        },
        {
          id: "sampling",
          kicker: "02 · SAMPLING",
          title: "나누기 전에 섞고, 비율은 보존한다",
          body: `
            <p>도미 35마리 뒤에 빙어 14마리가 정렬된 데이터를 앞 35개/뒤 14개로 자르면 훈련에는 도미만, 테스트에는 빙어만 남습니다. 점수 0은 알고리즘보다 <strong>샘플링 편향</strong>의 문제입니다.</p>
            <p>무작위로 섞되 분류에서는 각 클래스의 비율이 훈련과 테스트에 비슷하게 유지되도록 <code>stratify</code>를 사용합니다. 시계열은 미래를 섞어 과거 훈련에 넣으면 안 되므로 시간 순서로 나눠야 합니다. 같은 사람의 여러 사진처럼 묶인 표본은 사람 단위로 나누어야 누출을 막습니다.</p>
          `,
          code: {
            title: "재현 가능한 계층 분할",
            content: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)`
          }
        },
        {
          id: "scaling",
          kicker: "03 · PREPROCESSING",
          title: "단위가 거리를 지배하지 않게",
          body: `
            <p>길이는 수십 cm, 무게는 수백 g라면 유클리드 거리에서 무게 차이가 훨씬 크게 반영됩니다. 이것은 무게가 본질적으로 더 중요해서가 아니라 숫자의 단위가 크기 때문입니다. 거리 기반 K-NN, SVM, 경사하강 기반 모델은 특히 스케일에 민감합니다.</p>
            <p><strong>표준화</strong>는 각 특성에서 훈련 평균을 빼고 훈련 표준편차로 나눕니다. 테스트와 새 샘플에도 반드시 <em>훈련 세트에서 구한</em> 평균과 표준편차를 사용해야 합니다. 전체 데이터의 통계를 먼저 계산하면 테스트 정보가 훈련 과정에 새어 들어갑니다.</p>
          `,
          equation: {
            label: "표준 점수",
            tex: S`z_{ij}=\frac{x_{ij}-\mu_j^{\text{train}}}{\sigma_j^{\text{train}}}`,
            note: "변환 뒤 훈련 특성은 대체로 평균 0, 표준편차 1이 됩니다. 이상치가 많으면 RobustScaler도 고려합니다."
          }
        },
        {
          id: "augmentation-eda",
          kicker: "04 · ROBUSTNESS",
          title: "증강은 더 많은 파일이 아니라 더 나은 불변성",
          body: `
            <p>반전, 회전, 이동, 확대·축소, 밝기 변화, 채널 이동, 호모그래피는 한 표본의 <strong>정답을 유지하는 현실적 변형</strong>을 만들어 냅니다. 모델은 픽셀 위치를 외우는 대신 변형에도 유지되는 특징을 배우게 됩니다.</p>
            <p>하지만 모든 변형이 항상 안전하지는 않습니다. 숫자 6을 180도 돌리거나, 교통 표지를 좌우 반전하거나, 의학 영상의 방향을 바꾸면 의미가 변할 수 있습니다. 증강은 도메인의 보존 법칙을 코드로 표현하는 일입니다.</p>
            <h3>탐색적 데이터 분석에서 확인할 것</h3>
            <ul>
              <li>결측값, 중복, 단위 오류, 비현실적 범위</li>
              <li>타깃 불균형과 특성 분포, 이상치</li>
              <li>지리·시간·집단별 분포 차이와 상관관계</li>
              <li>타깃을 직접 또는 간접적으로 누출하는 특성</li>
            </ul>
          `
        }
      ],
      interactive: {
        type: "scaling",
        title: "스케일이 이웃을 바꾸는 순간",
        instruction: "원본 좌표와 표준화 좌표를 전환해 같은 표본의 최근접 이웃이 어떻게 달라지는지 확인하세요."
      },
      quiz: [
        {
          q: "표준화의 평균과 표준편차는 어디에서 계산해야 하는가?",
          options: ["전체 데이터", "훈련 세트만", "테스트 세트만"],
          answer: 1,
          why: "테스트 통계를 사용하면 아직 보지 않은 데이터의 정보가 훈련 파이프라인에 누출됩니다."
        },
        {
          q: "시계열 예측에서 무작위 셔플 분할이 위험한 주된 이유는?",
          options: ["표본 수가 줄어서", "미래 정보가 과거 훈련에 들어갈 수 있어서", "표준화가 불가능해서"],
          answer: 1,
          why: "시간 순서를 깨면 실제 배포에서는 사용할 수 없는 미래 패턴이 훈련에 포함될 수 있습니다."
        },
        {
          q: "가장 좋은 데이터 증강 원칙은?",
          options: ["가능한 변환을 모두 적용한다.", "정답 의미를 보존하는 현실적 변환만 적용한다.", "테스트 세트에만 적용한다."],
          answer: 1,
          why: "증강은 도메인에서 유효한 불변성을 모델에 알려 주는 과정입니다."
        }
      ],
      sources: [
        ["scikit-learn Preprocessing", "https://scikit-learn.org/stable/modules/preprocessing.html"],
        ["scikit-learn Common pitfalls and recommended practices", "https://scikit-learn.org/stable/common_pitfalls.html"],
        ["TensorFlow Image classification tutorial", "https://www.tensorflow.org/tutorials/images/classification"]
      ]
    },
    {
      id: "04-regression",
      num: "04",
      phase: "classical",
      phaseLabel: "고전 ML",
      shortTitle: "회귀와 규제",
      title: "숫자를 예측하고, 복잡함을 다스리기",
      subtitle: "K-NN 회귀의 한계에서 선형·다항·다중 회귀로 이동하고 Ridge와 Lasso로 일반화의 균형을 찾습니다.",
      summary: "K-NN 회귀, 선형·다항 회귀, 과적합, Ridge·Lasso",
      question: "훈련 데이터 밖의 100cm 농어 무게는 어떻게 예측해야 할까?",
      minutes: 46,
      keywords: ["회귀", "R2", "MAE", "선형회귀", "다항회귀", "특성공학", "과대적합", "릿지", "라쏘", "정규화"],
      objectives: [
        "K-NN 회귀와 선형 회귀의 보간·외삽 차이를 설명한다.",
        "MAE와 결정계수 R²의 의미를 구분한다.",
        "L1·L2 규제가 계수와 모델 복잡도에 미치는 영향을 비교한다."
      ],
      sections: [
        {
          id: "knn-regression",
          kicker: "01 · CONTINUOUS TARGET",
          title: "이웃의 평균으로 숫자를 예측한다",
          body: `
            <p>분류가 이웃의 클래스를 투표한다면 K-NN 회귀는 가까운 \\(k\\)개 표본의 타깃을 평균합니다. 농어의 길이가 비슷하면 무게도 비슷하다는 국소적 가정입니다.</p>
            <p><strong>MAE</strong>는 평균적으로 몇 g 틀렸는지 원래 단위로 알려 줍니다. <strong>결정계수 \\(R^2\\)</strong>는 단순히 타깃 평균만 예측한 기준선보다 얼마나 나은지 나타냅니다. 1이면 완벽, 0이면 평균 예측과 같고, 음수면 평균보다도 나쁩니다.</p>
          `,
          equation: {
            label: "MAE와 결정계수",
            tex: S`\operatorname{MAE}=\frac{1}{n}\sum_{i=1}^{n}|y_i-\hat y_i|, \qquad R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2}`,
            note: "서로 다른 문제의 R²를 단순 비교하기보다, 같은 데이터·분할·지표에서 모델을 비교하세요."
          }
        },
        {
          id: "extrapolation",
          kicker: "02 · MODEL ASSUMPTION",
          title: "K-NN은 본 범위 밖으로 나아가지 못한다",
          body: `
            <p>훈련에서 가장 긴 농어가 45cm 부근이라면 50cm와 100cm 농어의 최근접 이웃이 같을 수 있습니다. 그래서 두 입력에 같은 평균 무게를 예측합니다. K-NN은 관측된 타깃을 조합하는 <strong>보간</strong>에는 강하지만, 학습 범위를 넘어 추세를 연장하는 <strong>외삽</strong>에는 구조적 한계가 있습니다.</p>
            <p>선형 회귀는 \\(\\hat y=w_0+w_1x\\)라는 전역적 가정을 둡니다. 데이터 범위를 벗어나도 직선을 연장할 수 있지만, 그 가정이 현실과 맞는지는 별도의 문제입니다. 외삽 능력은 자동으로 정확성을 보장하지 않습니다.</p>
          `,
          equation: {
            label: "최소제곱 선형 회귀",
            tex: S`\hat{\mathbf w}=\arg\min_{\mathbf w}\|\mathbf y-\mathbf X\mathbf w\|_2^2`,
            note: "정규방정식으로 직접 풀거나, 큰 데이터에서는 경사하강법으로 반복 최적화할 수 있습니다."
          }
        },
        {
          id: "feature-engineering",
          kicker: "03 · REPRESENTATION",
          title: "직선 모델에 곡선을 볼 특성을 준다",
          body: `
            <p>선형 회귀에서 ‘선형’은 원래 입력 \\(x\\)가 아니라 <strong>학습할 계수 \\(w\\)에 대해 선형</strong>이라는 뜻입니다. \\(x^2, x^3\\) 같은 특성을 추가하면 같은 선형 회귀로 곡선을 표현할 수 있습니다. 길이·높이·두께와 이들의 곱을 함께 쓰면 다중 회귀가 됩니다.</p>
            <p>특성을 무작정 늘리면 훈련 데이터를 거의 완벽히 맞출 수 있지만 테스트 성능이 무너질 수 있습니다. 3개 특성의 5차 조합이 훈련 \\(R^2=1\\)에 가까워도 테스트 \\(R^2\\)가 크게 음수가 되는 것이 전형적인 과대적합입니다.</p>
            <div class="callout warning"><span class="callout-icon">!</span><div><strong>다항 차수는 지식이 아니라 유연성입니다.</strong><p>차수가 높을수록 진실에 가까운 것이 아니라, 더 다양한 곡선을 그릴 수 있습니다. 유연성은 검증 성능으로 통제해야 합니다.</p></div></div>
          `
        },
        {
          id: "regularization",
          kicker: "04 · REGULARIZATION",
          title: "계수를 줄여 더 단순한 설명을 선호한다",
          body: `
            <p>규제는 훈련 오차뿐 아니라 큰 계수에도 비용을 부과합니다. <strong>Ridge(L2)</strong>는 계수 제곱합을 벌점으로 주어 모든 계수를 부드럽게 줄입니다. 상관된 특성이 많을 때 안정적입니다. <strong>Lasso(L1)</strong>는 절댓값 합을 벌점으로 주고 일부 계수를 정확히 0으로 만들어 특성 선택 효과를 냅니다.</p>
            <p>규제 강도 \\(\\lambda\\) 또는 scikit-learn의 <code>alpha</code>가 0이면 일반 선형 회귀에 가깝고, 커질수록 단순해집니다. 너무 크면 중요한 신호까지 지워 과소적합합니다. 또한 계수 크기에 벌점을 주므로 규제 전에 특성 스케일을 맞춰야 공정합니다.</p>
          `,
          equation: {
            label: "Ridge와 Lasso 목적함수",
            tex: S`\mathcal L_{\text{ridge}}=\|\mathbf y-\mathbf X\mathbf w\|_2^2+\lambda\|\mathbf w\|_2^2,\qquad \mathcal L_{\text{lasso}}=\|\mathbf y-\mathbf X\mathbf w\|_2^2+\lambda\|\mathbf w\|_1`,
            note: "보통 절편에는 규제를 적용하지 않습니다. λ는 교차검증으로 선택합니다."
          },
          code: {
            title: "전처리와 Ridge를 하나의 파이프라인으로",
            content: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

model = make_pipeline(
    PolynomialFeatures(degree=2, include_bias=False),
    StandardScaler(),
    Ridge(alpha=0.1)
)
model.fit(X_train, y_train)`
          }
        }
      ],
      interactive: {
        type: "regression",
        title: "복잡도와 규제의 줄다리기",
        instruction: "다항 차수와 규제 강도를 바꿔 훈련 오차와 검증 오차의 간격을 관찰하세요."
      },
      quiz: [
        {
          q: "K-NN 회귀가 훈련 범위 밖 외삽에 약한 이유는?",
          options: ["항상 직선만 학습해서", "관측한 이웃의 타깃을 조합해 예측해서", "타깃 평균을 계산하지 못해서"],
          answer: 1,
          why: "K-NN의 예측은 이웃 타깃의 평균이므로 본 적 없는 범위의 추세를 모델 자체로 연장하지 않습니다."
        },
        {
          q: "Lasso가 Ridge보다 두드러지는 특징은?",
          options: ["일부 계수를 정확히 0으로 만들 수 있다.", "스케일링이 필요 없다.", "항상 더 높은 정확도를 낸다."],
          answer: 0,
          why: "L1 벌점은 최적해를 축과 만나게 해 희소한 계수를 만들 수 있습니다."
        },
        {
          q: "훈련 R²가 높고 테스트 R²가 크게 낮다면 먼저 의심할 것은?",
          options: ["과소적합", "과대적합", "레이블이 연속형이라는 사실"],
          answer: 1,
          why: "훈련에만 지나치게 맞고 새 데이터에 일반화하지 못하는 전형적인 신호입니다."
        }
      ],
      sources: [
        ["scikit-learn Linear Models", "https://scikit-learn.org/stable/modules/linear_model.html"],
        ["scikit-learn Model selection", "https://scikit-learn.org/stable/model_selection.html"]
      ]
    },
    {
      id: "05-classification",
      num: "05",
      phase: "classical",
      phaseLabel: "고전 ML",
      shortTitle: "분류와 최적화",
      title: "점수를 확률로, 확률을 결정으로",
      subtitle: "로지스틱 회귀의 시그모이드·소프트맥스와 크로스엔트로피, 경사하강법의 학습률·에포크를 한 흐름으로 이해합니다.",
      summary: "다중 분류, 로지스틱 회귀, 크로스엔트로피, SGD, SVM",
      question: "모델의 숫자 하나를 어떻게 ‘빙어일 확률’로 바꿀까?",
      minutes: 48,
      keywords: ["다중분류", "로지스틱 회귀", "시그모이드", "소프트맥스", "크로스엔트로피", "경사하강법", "학습률", "에포크", "SVM"],
      objectives: [
        "로짓, 시그모이드, 확률, 임곗값의 관계를 설명한다.",
        "이진·다중 크로스엔트로피가 틀린 확신을 크게 벌주는 이유를 이해한다.",
        "배치·확률적·미니배치 경사하강법을 비교한다."
      ],
      sections: [
        {
          id: "probability",
          kicker: "01 · LOGISTIC REGRESSION",
          title: "직선의 출력을 S자 함수로 누른다",
          body: `
            <p>로지스틱 회귀는 먼저 선형 결합 \\(z=\\mathbf w^T\\mathbf x+b\\)를 계산합니다. 이 값은 제한 없는 <strong>로짓(logit)</strong> 또는 결정 점수입니다. 시그모이드 함수를 통과시키면 0과 1 사이의 확률 \\(p\\)가 됩니다.</p>
            <p>확률이 0.5 이상이면 양성으로 분류하는 것은 관습적인 기본값일 뿐입니다. 질병을 놓치는 비용이 오탐보다 크다면 임곗값을 낮출 수 있습니다. <strong>모델이 추정한 확률</strong>과 <strong>운영에서 선택한 결정</strong>을 구분해야 합니다.</p>
          `,
          equation: {
            label: "시그모이드와 로그 오즈",
            tex: S`p(y=1\mid x)=\sigma(z)=\frac{1}{1+e^{-z}},\qquad \log\frac{p}{1-p}=z`,
            note: "선형 모델은 확률 자체가 아니라 확률의 오즈에 로그를 취한 값을 선형으로 모델링합니다."
          }
        },
        {
          id: "cross-entropy",
          kicker: "02 · LOSS",
          title: "틀린 확신에 큰 비용을 준다",
          body: `
            <p>정답이 1인데 0.9를 예측하면 손실은 작고, 0.01을 예측하면 매우 큽니다. 로그 손실은 단순히 맞고 틀림만 보지 않고 <strong>확신의 정도</strong>를 학습 신호로 사용합니다. 정확도는 0.51과 0.99를 같은 정답으로 세지만, 크로스엔트로피는 0.99를 더 좋은 예측으로 봅니다.</p>
          `,
          equation: {
            label: "이진 크로스엔트로피",
            tex: S`\ell(y,p)=-\left[y\log p+(1-y)\log(1-p)\right]`,
            note: "p가 0이나 1에 너무 가까우면 수치적으로 불안정하므로 실제 구현은 로짓에서 안정적으로 계산합니다."
          }
        },
        {
          id: "softmax",
          kicker: "03 · MULTICLASS",
          title: "여러 점수를 하나의 확률 분포로",
          body: `
            <p>도미·농어·빙어 등 \\(K\\)개 클래스를 분류할 때 모델은 클래스마다 로짓 \\(z_k\\)를 냅니다. 소프트맥스는 각 점수를 지수화하고 전체 합으로 나누어 합이 1인 확률 분포를 만듭니다. 모든 로짓에 같은 상수를 더해도 확률은 바뀌지 않습니다.</p>
            <p>정답을 길이 \\(K\\)인 원-핫 벡터로 표현하면 categorical crossentropy를, 정수 인덱스 그대로 쓰면 sparse categorical crossentropy를 사용합니다. 두 손실의 의미는 같고 레이블 표현만 다릅니다.</p>
          `,
          equation: {
            label: "소프트맥스",
            tex: S`p_k=\frac{e^{z_k}}{\sum_{j=1}^{K}e^{z_j}},\qquad \sum_{k=1}^{K}p_k=1`,
            note: "수치 안정성을 위해 구현에서는 보통 모든 로짓에서 최댓값을 뺀 뒤 지수화합니다."
          }
        },
        {
          id: "gradient-descent",
          kicker: "04 · OPTIMIZATION",
          title: "기울기의 반대 방향으로 조금씩",
          body: `
            <p>경사하강법은 현재 파라미터에서 손실이 가장 빨리 증가하는 방향인 기울기를 구하고, 그 반대 방향으로 이동합니다. <strong>학습률</strong>이 너무 작으면 느리고, 너무 크면 골짜기를 건너뛰며 발산할 수 있습니다.</p>
            <table class="comparison-table">
              <thead><tr><th>방법</th><th>한 번의 기울기에 쓰는 데이터</th><th>성격</th></tr></thead>
              <tbody>
                <tr><td>Batch GD</td><td>전체 훈련 세트</td><td>안정적이지만 큰 데이터에서 한 걸음이 비쌈</td></tr>
                <tr><td>SGD</td><td>표본 1개</td><td>빠르고 온라인 학습 가능, 경로가 요동함</td></tr>
                <tr><td>Mini-batch GD</td><td>작은 묶음</td><td>GPU 병렬성·속도·안정성의 균형</td></tr>
              </tbody>
            </table>
            <p><strong>에포크</strong>는 훈련 데이터를 한 바퀴 사용한 횟수입니다. 너무 적으면 과소적합, 너무 많으면 훈련 손실은 계속 줄어도 검증 손실이 다시 커질 수 있습니다. 이때 조기 종료가 유용합니다.</p>
          `,
          equation: {
            label: "경사하강 업데이트",
            tex: S`\theta_{t+1}=\theta_t-\eta\nabla_{\theta}\mathcal L(\theta_t)`,
            note: "η는 학습률입니다. Adam은 방향의 관성과 파라미터별 보폭 조정을 함께 사용합니다."
          },
          code: {
            title: "점진 학습과 에포크 추적",
            content: `from sklearn.linear_model import SGDClassifier

model = SGDClassifier(loss="log_loss", random_state=42)
for epoch in range(100):
    model.partial_fit(X_train, y_train, classes=classes)
    train_score.append(model.score(X_train, y_train))
    valid_score.append(model.score(X_valid, y_valid))`
          }
        },
        {
          id: "svm",
          kicker: "05 · MARGIN",
          title: "SVM은 경계와 가장 가까운 점을 본다",
          body: `
            <p>선형 SVM은 두 클래스 사이에서 단순히 나누는 선 하나가 아니라 <strong>마진</strong>이 가장 넓은 경계를 찾습니다. 경계에 가장 가까운 훈련 표본이 서포트 벡터이며, 이들이 결정 경계를 주로 규정합니다. <code>C</code>가 크면 훈련 오분류를 강하게 벌주어 좁고 복잡한 마진을, 작으면 일부 오류를 허용해 넓은 마진을 선호합니다.</p>
          `
        }
      ],
      interactive: {
        type: "sigmoid",
        title: "로짓–확률–결정 탐색기",
        instruction: "로짓과 임곗값을 움직여 확률과 최종 클래스가 서로 다른 단계임을 확인하세요."
      },
      quiz: [
        {
          q: "시그모이드의 입력 z는 무엇인가?",
          options: ["이미 0~1인 확률", "특성의 선형 결합인 로짓", "정답 클래스 인덱스"],
          answer: 1,
          why: "로지스틱 회귀는 선형 결합을 계산한 뒤 시그모이드로 확률 범위에 매핑합니다."
        },
        {
          q: "정확도는 같지만 크로스엔트로피가 다른 두 모델이 있을 수 있는 이유는?",
          options: ["크로스엔트로피는 예측 확신도까지 보기 때문", "정확도는 회귀에만 쓰기 때문", "소프트맥스 합이 1이 아니기 때문"],
          answer: 0,
          why: "정확도는 임곗값 뒤의 정답 여부만 보지만 손실은 정답에 준 확률을 연속적으로 평가합니다."
        },
        {
          q: "딥러닝에서 미니배치가 널리 쓰이는 이유는?",
          options: ["기울기가 항상 정확해서", "병렬 계산 효율과 안정성의 균형이 좋아서", "에포크가 필요 없어서"],
          answer: 1,
          why: "미니배치는 전체 배치보다 저렴하면서 한 표본 SGD보다 안정적이고 GPU 병렬 연산에 잘 맞습니다."
        }
      ],
      sources: [
        ["scikit-learn Logistic Regression", "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"],
        ["scikit-learn Stochastic Gradient Descent", "https://scikit-learn.org/stable/modules/sgd.html"],
        ["scikit-learn Support Vector Machines", "https://scikit-learn.org/stable/modules/svm.html"]
      ]
    },
    {
      id: "06-trees",
      num: "06",
      phase: "classical",
      phaseLabel: "고전 ML",
      shortTitle: "트리와 앙상블",
      title: "질문을 쌓고, 여러 모델의 판단을 모으기",
      subtitle: "결정트리의 불순도와 가지치기, 교차검증과 탐색, 배깅·부스팅을 와인 분류 흐름으로 연결합니다.",
      summary: "결정트리, 교차검증, 그리드·랜덤 탐색, 랜덤포레스트, 부스팅",
      question: "설명 가능한 한 그루보다 다양한 백 그루가 강한 이유는?",
      minutes: 52,
      keywords: ["결정트리", "지니불순도", "정보이득", "가지치기", "교차검증", "그리드서치", "랜덤서치", "랜덤포레스트", "배깅", "부스팅", "XGBoost"],
      objectives: [
        "지니 불순도와 정보 이득으로 트리 분할을 설명한다.",
        "검증 세트·교차검증·테스트 세트의 역할을 구분한다.",
        "배깅과 부스팅의 모델 생성 방식과 오차 감소 원리를 비교한다."
      ],
      sections: [
        {
          id: "tree",
          kicker: "01 · DECISION TREE",
          title: "가장 잘 섞임을 줄이는 질문을 고른다",
          body: `
            <p>결정트리는 “당도가 1.625보다 큰가?”처럼 한 특성과 임곗값으로 데이터를 둘로 나눕니다. 후보 분할마다 자식 노드의 불순도를 계산해 부모보다 가장 많이 순수해지는 질문을 선택합니다.</p>
            <p>지니 불순도는 노드 안에서 임의로 뽑은 표본의 클래스를 그 노드의 분포대로 추측할 때 틀릴 확률로 해석할 수 있습니다. 한 클래스만 있으면 0이고, 이진 클래스가 반반이면 0.5입니다.</p>
          `,
          equation: {
            label: "지니 불순도와 정보 이득",
            tex: S`G(t)=1-\sum_{k=1}^{K}p_{k|t}^{\,2},\qquad \Delta G=G(t)-\frac{n_L}{n_t}G(t_L)-\frac{n_R}{n_t}G(t_R)`,
            note: "트리는 ΔG가 큰 분할을 선호합니다. entropy 기준을 써도 비슷한 트리가 만들어지는 경우가 많습니다."
          }
        },
        {
          id: "pruning",
          kicker: "02 · COMPLEXITY",
          title: "깊어질수록 설명은 길고 일반화는 약해진다",
          body: `
            <p>제한 없는 트리는 훈련 표본 하나하나를 분리해 거의 완벽한 정확도에 도달할 수 있습니다. 그러나 작은 잡음까지 규칙으로 만든 결과라 테스트 성능은 낮아집니다. <code>max_depth</code>, <code>min_samples_leaf</code>, <code>min_impurity_decrease</code>로 성장을 제한하거나 완성된 트리를 가지치기합니다.</p>
            <p>트리는 특성의 순서와 임곗값만 보므로 보통 표준화가 필요 없습니다. 반면 작은 데이터 변화에도 상단 분할이 달라져 전체 구조가 크게 흔들리는 <strong>높은 분산</strong>이 약점입니다.</p>
          `
        },
        {
          id: "validation-search",
          kicker: "03 · MODEL SELECTION",
          title: "테스트를 건드리지 않고 설정을 고른다",
          body: `
            <p>검증 세트 하나의 점수도 어떤 표본이 우연히 들어갔는지에 따라 달라집니다. K-겹 교차검증은 훈련 데이터를 K조각으로 나누고, 한 조각씩 검증에 번갈아 사용해 점수를 평균합니다. 분류에서는 클래스 비율을 유지하는 StratifiedKFold가 기본 선택입니다.</p>
            <p><strong>그리드 탐색</strong>은 지정한 조합을 모두 비교해 촘촘한 작은 공간에 적합합니다. <strong>랜덤 탐색</strong>은 분포에서 조합을 뽑아 중요한 하이퍼파라미터가 일부일 때 같은 예산으로 더 넓은 범위를 탐색합니다. 어느 방법이든 탐색 전체를 교차검증 안에서 수행해야 합니다.</p>
          `,
          code: {
            title: "교차검증을 포함한 랜덤 탐색",
            content: `from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

space = {
    "max_depth": randint(3, 30),
    "min_samples_leaf": randint(1, 30),
    "min_impurity_decrease": uniform(0.0, 0.001)
}
search = RandomizedSearchCV(
    DecisionTreeClassifier(random_state=42),
    space, n_iter=100, cv=5, n_jobs=-1, random_state=42
)
search.fit(X_train, y_train)`
          }
        },
        {
          id: "bagging",
          kicker: "04 · BAGGING",
          title: "서로 다른 실수를 평균내는 랜덤 포레스트",
          body: `
            <p>배깅은 훈련 표본을 중복 허용해 여러 부트스트랩 샘플로 만들고 각 모델을 독립적으로 학습한 뒤 예측을 평균·투표합니다. 불안정한 트리들이 서로 다른 방향으로 틀리면 평균에서 오차가 상쇄됩니다.</p>
            <p>랜덤 포레스트는 표본뿐 아니라 각 노드에서 볼 특성도 무작위로 제한해 트리 사이의 상관을 줄입니다. 개별 트리는 조금 약해질 수 있지만 숲 전체의 분산이 낮아집니다. 특성 중요도는 유용하지만, 고유값이 많은 특성에 편향될 수 있어 permutation importance와 함께 보는 편이 안전합니다.</p>
          `
        },
        {
          id: "boosting",
          kicker: "05 · BOOSTING",
          title: "이전 모델의 잔차를 다음 모델이 배운다",
          body: `
            <p>부스팅은 모델을 병렬로 독립 학습하지 않고 순차적으로 더합니다. Gradient Boosting은 현재 앙상블의 손실을 줄이는 방향, 즉 손실의 음의 기울기 또는 회귀의 잔차를 다음 얕은 트리가 근사합니다.</p>
            <p>XGBoost, LightGBM, CatBoost는 히스토그램, 규제, 결측 처리, 범주형 특성 처리, 병렬화 방식 등을 발전시킨 구현입니다. 표 형태의 정형 데이터에서 강력하지만, 데이터 누출이나 잘못된 검증을 해결해 주지는 않습니다.</p>
            <table class="comparison-table">
              <thead><tr><th>구분</th><th>배깅 / Random Forest</th><th>Boosting</th></tr></thead>
              <tbody>
                <tr><td>학습</td><td>독립·병렬</td><td>순차적</td></tr>
                <tr><td>주요 효과</td><td>분산 감소</td><td>편향을 단계적으로 감소</td></tr>
                <tr><td>민감성</td><td>상대적으로 안정적</td><td>학습률·트리 수·깊이 튜닝 중요</td></tr>
              </tbody>
            </table>
          `
        }
      ],
      interactive: {
        type: "tree",
        title: "한 번의 분할이 만드는 정보 이득",
        instruction: "임곗값을 움직여 왼쪽·오른쪽 노드의 지니 불순도와 정보 이득을 비교하세요."
      },
      quiz: [
        {
          q: "결정트리의 한 노드가 순수하다는 뜻은?",
          options: ["모든 특성이 표준화됨", "대부분 또는 전부가 같은 클래스임", "샘플 수가 항상 많음"],
          answer: 1,
          why: "불순도는 클래스가 섞인 정도를 뜻합니다. 한 클래스만 있으면 지니 불순도는 0입니다."
        },
        {
          q: "테스트 세트의 올바른 사용 시점은?",
          options: ["매 하이퍼파라미터 조합마다", "모든 모델 선택이 끝난 뒤 최종 평가에", "전처리 통계 계산에"],
          answer: 1,
          why: "테스트를 선택에 반복 사용하면 더 이상 독립적인 일반화 성능 추정이 아닙니다."
        },
        {
          q: "랜덤 포레스트가 트리 사이의 상관을 줄이는 장치는?",
          options: ["모든 트리가 같은 특성만 봄", "부트스트랩과 무작위 특성 선택", "트리를 한 그루만 사용"],
          answer: 1,
          why: "데이터와 특성의 무작위성으로 서로 다른 트리를 만들어 평균의 분산 감소 효과를 키웁니다."
        }
      ],
      sources: [
        ["scikit-learn Decision Trees", "https://scikit-learn.org/stable/modules/tree.html"],
        ["scikit-learn Cross-validation", "https://scikit-learn.org/stable/modules/cross_validation.html"],
        ["scikit-learn Ensemble methods", "https://scikit-learn.org/stable/modules/ensemble.html"],
        ["XGBoost Documentation", "https://xgboost.readthedocs.io/"]
      ]
    },
    {
      id: "07-unsupervised",
      num: "07",
      phase: "classical",
      phaseLabel: "고전 ML",
      shortTitle: "군집과 PCA",
      title: "정답 없이 구조를 발견하고 압축하기",
      subtitle: "과일 이미지의 픽셀 평균에서 K-평균 군집과 PCA로 나아가며 비지도학습이 무엇을 찾는지 이해합니다.",
      summary: "군집, K-평균, inertia, elbow, 주성분분석, 설명 분산",
      question: "이름표가 없는 300장의 과일 사진에서 세 종류를 찾을 수 있을까?",
      minutes: 44,
      keywords: ["비지도학습", "군집", "K-means", "centroid", "inertia", "elbow", "PCA", "차원축소", "설명분산", "재구성"],
      objectives: [
        "K-평균의 할당·중심 갱신 반복을 설명한다.",
        "inertia와 elbow가 알려 주는 것과 한계를 이해한다.",
        "PCA가 최대 분산 방향으로 투영하는 과정을 설명한다."
      ],
      sections: [
        {
          id: "clustering",
          kicker: "01 · NO LABELS",
          title: "군집은 정답을 맞히는 일이 아니다",
          body: `
            <p>군집은 비슷한 표본을 같은 그룹으로 묶지만 그 그룹이 반드시 사람이 원하는 의미와 일치하지는 않습니다. 과일 사진을 평균 밝기로만 보면 바나나가 잘 분리될 수 있지만, 촬영 배경이나 조명이 과일 종류보다 더 큰 변동이라면 군집은 배경을 먼저 나눌 수 있습니다.</p>
            <p>따라서 군집 결과의 번호 0, 1, 2에는 순서나 의미가 없습니다. 라벨이 있는 일부 표본, 시각화, 도메인 지식으로 각 군집이 무엇을 포착했는지 해석해야 합니다.</p>
          `
        },
        {
          id: "kmeans",
          kicker: "02 · K-MEANS",
          title: "할당하고, 평균내고, 다시 할당한다",
          body: `
            <ol>
              <li>\\(k\\)개의 중심을 초기화합니다.</li>
              <li>각 표본을 가장 가까운 중심에 할당합니다.</li>
              <li>각 군집 표본의 평균으로 중심을 갱신합니다.</li>
              <li>할당이나 중심이 거의 바뀌지 않을 때까지 반복합니다.</li>
            </ol>
            <p>K-평균은 군집 안 거리 제곱합인 inertia를 줄입니다. 초기 중심에 따라 지역 최적해가 달라질 수 있어 k-means++ 초기화와 여러 번의 재시작을 사용합니다. 구형이고 비슷한 크기의 군집에는 잘 맞지만, 초승달 모양·서로 다른 밀도·이상치에는 약합니다.</p>
          `,
          equation: {
            label: "K-평균 목적함수",
            tex: S`\min_{\{\mu_k\},\,\{c_i\}}\sum_{i=1}^{n}\left\|x_i-\mu_{c_i}\right\|_2^2`,
            note: "cᵢ는 표본 i의 군집 번호, μ는 군집 중심입니다. 최적 k 자체를 알려 주는 식은 아닙니다."
          }
        },
        {
          id: "choose-k",
          kicker: "03 · MODEL SELECTION",
          title: "팔꿈치는 정답표가 아니라 단서다",
          body: `
            <p>\\(k\\)를 늘리면 중심이 많아져 inertia는 반드시 감소하고, \\(k=n\\)이면 0입니다. 감소가 급격하다가 완만해지는 지점을 elbow로 선택할 수 있지만 곡선에 뚜렷한 팔꿈치가 없을 수도 있습니다.</p>
            <p>silhouette score, 군집 안정성, 실제 활용 가능성, 도메인 지식을 함께 보세요. 고객 군집이라면 “수학적으로 잘 나뉨”뿐 아니라 각 그룹에 서로 다른 행동을 취할 수 있는지도 중요합니다.</p>
          `
        },
        {
          id: "pca",
          kicker: "04 · PCA",
          title: "가장 많이 퍼진 방향을 새 축으로",
          body: `
            <p>100×100 이미지는 10,000차원 벡터입니다. PCA는 데이터를 평균 중심화한 뒤 분산이 가장 큰 직교 방향을 차례로 찾고 그 축에 투영합니다. 50개 주성분만으로도 원래 과일 이미지 분산의 큰 부분을 유지할 수 있고, 저장 공간·학습 시간·잡음을 줄일 수 있습니다.</p>
            <p>주성분은 원래 특성의 선형 결합이며, 첫 성분이 가장 큰 분산을 설명합니다. <strong>설명 분산 비율</strong>의 누적합으로 유지할 정보량을 정할 수 있습니다. 다만 “분산이 큼 = 과업에 중요함”은 아닙니다. 작은 분산 방향에 클래스 정보가 있을 수도 있습니다.</p>
          `,
          equation: {
            label: "첫 번째 주성분",
            tex: S`v_1=\arg\max_{\|v\|=1}\operatorname{Var}(Xv),\qquad z=Xv_1`,
            note: "이후 성분은 앞 성분과 직교하면서 남은 분산을 최대화합니다. 실무 구현은 SVD를 주로 사용합니다."
          },
          code: {
            title: "분산 92%를 유지하도록 PCA",
            content: `from sklearn.decomposition import PCA

pca = PCA(n_components=0.92, random_state=42)
X_compact = pca.fit_transform(X_train)
X_reconstructed = pca.inverse_transform(X_compact)

print(pca.n_components_)
print(pca.explained_variance_ratio_.sum())`
          }
        }
      ],
      interactive: {
        type: "kmeans",
        title: "K-평균의 한 스텝씩 보기",
        instruction: "중심을 초기화하고 ‘다음 단계’를 눌러 할당과 중심 이동이 번갈아 일어나는 과정을 확인하세요."
      },
      quiz: [
        {
          q: "K-평균에서 군집 번호 0과 1의 관계는?",
          options: ["0이 항상 더 작은 군집", "번호 자체에는 순서나 의미가 없음", "0은 반드시 정상 데이터"],
          answer: 1,
          why: "군집 레이블은 임의의 식별자이며 실행마다 번호가 바뀔 수도 있습니다."
        },
        {
          q: "k를 늘릴 때 inertia는 보통 어떻게 되는가?",
          options: ["증가한다.", "감소하거나 같다.", "무작위로 변한다."],
          answer: 1,
          why: "중심이 늘면 각 표본이 더 가까운 중심을 선택할 수 있으므로 거리 제곱합은 증가하지 않습니다."
        },
        {
          q: "PCA의 첫 주성분이 찾는 것은?",
          options: ["타깃과 상관이 가장 큰 방향", "데이터 분산이 가장 큰 단위 방향", "평균이 가장 작은 특성"],
          answer: 1,
          why: "PCA는 라벨을 보지 않고 투영된 데이터의 분산을 최대화합니다."
        }
      ],
      sources: [
        ["scikit-learn Clustering", "https://scikit-learn.org/stable/modules/clustering.html"],
        ["scikit-learn Decomposing signals in components", "https://scikit-learn.org/stable/modules/decomposition.html"]
      ]
    },
    {
      id: "08-deep-learning",
      num: "08",
      phase: "deep",
      phaseLabel: "딥러닝",
      shortTitle: "신경망 학습",
      title: "표현을 쌓고, 오차를 거꾸로 전달하기",
      subtitle: "뉴런의 가중합에서 다층 신경망, 순전파·역전파, 옵티마이저·드롭아웃·조기 종료까지 연결합니다.",
      summary: "뉴런, 활성화 함수, MLP, 역전파, Adam, Dropout, Callback",
      question: "79,510개의 파라미터는 어떻게 각자의 책임을 알게 될까?",
      minutes: 58,
      keywords: ["인공신경망", "뉴런", "가중치", "편향", "ReLU", "MLP", "순전파", "역전파", "Adam", "Dropout", "Early Stopping", "Fashion MNIST"],
      objectives: [
        "뉴런의 가중합·편향·활성화 함수를 계산한다.",
        "순전파, 손실, 역전파, 옵티마이저의 역할을 분리해 설명한다.",
        "드롭아웃·조기 종료·체크포인트가 일반화를 돕는 방식을 이해한다."
      ],
      sections: [
        {
          id: "neuron",
          kicker: "01 · NEURON",
          title: "입력에 중요도를 곱하고 비선형성을 더한다",
          body: `
            <p>뉴런은 입력마다 가중치를 곱해 더하고 편향을 더한 뒤 활성화 함수를 적용합니다. 가중치는 어떤 입력을 얼마나 중요하게 볼지, 편향은 결정 경계를 원점에서 얼마나 이동할지 정합니다.</p>
            <p>활성화 함수가 모두 선형이면 층을 아무리 많이 쌓아도 전체는 하나의 선형 변환과 같습니다. ReLU 같은 비선형 함수가 있어야 여러 층이 꺾인 복잡한 결정 경계를 표현할 수 있습니다.</p>
          `,
          equation: {
            label: "한 뉴런의 순전파",
            tex: S`v=\mathbf x^\top\mathbf w+b,\qquad y=\phi(v),\qquad \operatorname{ReLU}(v)=\max(0,v)`,
            note: "출력층은 과업에 맞춰 이진 분류에 sigmoid, 다중 분류에 softmax, 회귀에 선형 출력을 주로 사용합니다."
          }
        },
        {
          id: "layers",
          kicker: "02 · REPRESENTATION",
          title: "한 층의 출력이 다음 층의 언어가 된다",
          body: `
            <p>Fashion-MNIST의 28×28 픽셀을 펼치면 784개 입력입니다. Dense(100)는 각 픽셀을 100개 뉴런 모두에 연결해 100차원의 새로운 표현을 만듭니다. 그다음 Dense(10)가 열 종류의 로짓을 출력합니다.</p>
            <p>파라미터 수는 연결 수와 편향 수의 합입니다. 첫 Dense는 \\(784\\times100+100=78{,}500\\), 출력층은 \\(100\\times10+10=1{,}010\\)개입니다. 총 79,510개 값이 데이터에서 조정됩니다.</p>
            <div class="callout"><span class="callout-icon">#</span><div><strong>Flatten은 학습하지 않습니다.</strong><p>28×28 배열의 배치 구조를 784 벡터로 바꿀 뿐, 파라미터는 0개입니다. 반대로 Dense는 모든 연결에 가중치를 가집니다.</p></div></div>
          `,
          code: {
            title: "Fashion-MNIST MLP",
            content: `from tensorflow import keras

model = keras.Sequential([
    keras.Input(shape=(28, 28)),
    keras.layers.Rescaling(1 / 255.0),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation="relu"),
    keras.layers.Dense(10, activation="softmax"),
])
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)`
          }
        },
        {
          id: "backprop",
          kicker: "03 · LEARNING",
          title: "역전파는 기울기를, 옵티마이저는 업데이트를",
          body: `
            <p><strong>순전파</strong>는 입력을 층마다 변환해 예측과 손실을 계산합니다. <strong>역전파</strong>는 연쇄법칙으로 출력 손실이 각 가중치에 얼마나 민감한지 뒤에서 앞으로 계산합니다. <strong>옵티마이저</strong>는 그 기울기를 이용해 실제 가중치를 갱신합니다.</p>
            <p>이 세 역할을 섞어 말하지 않는 것이 중요합니다. 역전파 자체가 학습률을 정하거나 가중치를 바꾸는 것은 아닙니다. SGD, Momentum, RMSprop, Adam이 보폭과 방향의 이력을 관리합니다.</p>
          `,
          equation: {
            label: "연쇄법칙으로 책임 배분",
            tex: S`\frac{\partial \mathcal L}{\partial w^{(1)}}=\frac{\partial \mathcal L}{\partial z^{(2)}}\frac{\partial z^{(2)}}{\partial a^{(1)}}\frac{\partial a^{(1)}}{\partial z^{(1)}}\frac{\partial z^{(1)}}{\partial w^{(1)}}`,
            note: "깊은 네트워크에서 작은 미분값이 연속 곱해지면 기울기 소실이 생길 수 있습니다. ReLU, 정규화, 잔차 연결이 이를 완화합니다."
          }
        },
        {
          id: "training-memory",
          kicker: "04 · SYSTEM VIEW",
          title: "학습 메모리는 가중치보다 훨씬 크다",
          body: `
            <p>학습 중에는 가중치만 저장하지 않습니다. 각 파라미터의 gradient, Adam의 1차·2차 모멘트, 역전파에 필요한 각 층의 activation이 필요합니다. FP32 Adam 기준 파라미터당 가중치·기울기·두 상태값으로만 대략 4배 메모리가 듭니다.</p>
            <p>Mixed precision은 계산과 일부 저장을 FP16/BF16으로 줄이고, gradient checkpointing은 activation을 덜 저장하는 대신 역전파 때 다시 계산합니다. 큰 모델의 학습은 알고리즘 문제이자 메모리·통신 문제입니다.</p>
          `
        },
        {
          id: "generalization-tools",
          kicker: "05 · TRAINING PRACTICE",
          title: "최고의 마지막 에포크가 아니라 최고의 검증 에포크",
          body: `
            <p><strong>Dropout</strong>은 훈련 중 뉴런 출력을 무작위로 0으로 만들어 특정 경로에만 의존하지 않게 합니다. 추론 때는 모든 뉴런을 사용하며 기대 출력 크기가 맞도록 프레임워크가 처리합니다.</p>
            <p><strong>ModelCheckpoint</strong>는 검증 손실이 좋아질 때만 모델을 저장하고, <strong>EarlyStopping</strong>은 일정 기간 개선이 없으면 훈련을 멈춥니다. 마지막 가중치가 아니라 가장 좋았던 가중치를 복원해야 합니다.</p>
          `,
          code: {
            title: "검증 손실 기준 체크포인트와 조기 종료",
            content: `callbacks = [
    keras.callbacks.ModelCheckpoint(
        "best.keras", monitor="val_loss", save_best_only=True
    ),
    keras.callbacks.EarlyStopping(
        monitor="val_loss", patience=2, restore_best_weights=True
    )
]
history = model.fit(
    X_train, y_train,
    validation_data=(X_valid, y_valid),
    epochs=50,
    callbacks=callbacks
)`
          }
        }
      ],
      interactive: {
        type: "neuron",
        title: "뉴런 한 개의 순전파",
        instruction: "입력·가중치·편향과 활성화 함수를 바꿔 가중합과 출력이 어떻게 달라지는지 계산하세요."
      },
      quiz: [
        {
          q: "은닉층에 비선형 활성화 함수가 필요한 이유는?",
          options: ["파라미터 수를 0으로 만들기 위해", "여러 층이 복잡한 비선형 함수를 표현하게 하기 위해", "입력을 항상 확률로 만들기 위해"],
          answer: 1,
          why: "선형 변환만 합성하면 층 수와 관계없이 하나의 선형 변환으로 축약됩니다."
        },
        {
          q: "역전파의 직접적인 역할은?",
          options: ["각 파라미터에 대한 손실 기울기 계산", "데이터를 훈련·검증으로 분할", "학습률을 무조건 0.001로 설정"],
          answer: 0,
          why: "가중치 갱신은 옵티마이저가 하고, 역전파는 연쇄법칙으로 필요한 기울기를 계산합니다."
        },
        {
          q: "EarlyStopping에서 restore_best_weights=True가 중요한 이유는?",
          options: ["첫 에포크로 돌아가기 위해", "마지막이 아니라 검증 성능이 가장 좋았던 가중치를 쓰기 위해", "Dropout을 비활성화하기 위해"],
          answer: 1,
          why: "훈련을 멈춘 시점은 이미 성능이 나빠진 뒤일 수 있으므로 최고 검증 시점의 가중치를 복원합니다."
        }
      ],
      sources: [
        ["Keras Sequential model guide", "https://keras.io/guides/sequential_model/"],
        ["Keras Training & evaluation guide", "https://keras.io/guides/training_with_built_in_methods/"],
        ["Deep Learning, Nature 2015", "https://www.nature.com/articles/nature14539"]
      ]
    },
    {
      id: "09-cnn",
      num: "09",
      phase: "deep",
      phaseLabel: "딥러닝",
      shortTitle: "이미지와 CNN",
      title: "작은 필터로 공간의 패턴을 읽기",
      subtitle: "지역 연결·가중치 공유라는 CNN의 핵심에서 합성곱·패딩·스트라이드·풀링, 전이학습까지 나아갑니다.",
      summary: "합성곱, 커널, 특성맵, 패딩·스트라이드, 풀링, 전이학습",
      question: "같은 부리가 사진의 다른 위치에 나타나도 어떻게 알아볼까?",
      minutes: 55,
      keywords: ["CNN", "합성곱", "커널", "필터", "feature map", "stride", "padding", "pooling", "channel", "VGG16", "전이학습", "fine-tuning"],
      objectives: [
        "지역 연결과 가중치 공유가 CNN을 효율적으로 만드는 이유를 설명한다.",
        "입력·커널·패딩·스트라이드로 출력 크기를 계산한다.",
        "특징 추출, 전이학습, 미세조정의 단계를 구분한다."
      ],
      sections: [
        {
          id: "inductive-bias",
          kicker: "01 · WHY CNN",
          title: "이미지의 구조를 아는 연결 방식",
          body: `
            <p>완전연결층은 28×28 픽셀을 펼쳐 위치 관계를 약하게 만들고 모든 입력–뉴런 쌍에 별도 가중치를 둡니다. CNN은 두 가지 이미지 성질을 구조에 반영합니다.</p>
            <div class="concept-grid">
              <div class="concept-card"><b>지역성 Locality</b><span>모서리·부리 같은 특징은 작은 주변 픽셀의 관계로 나타납니다.</span></div>
              <div class="concept-card"><b>가중치 공유</b><span>같은 필터를 모든 위치에 적용해 특징이 어디에 있어도 찾습니다.</span></div>
            </div>
            <p>이런 가정을 <strong>귀납적 편향</strong>이라고 합니다. 모든 문제를 자유롭게 표현하는 대신 이미지에 맞는 제약을 넣어 더 적은 데이터와 파라미터로 학습합니다.</p>
          `
        },
        {
          id: "convolution",
          kicker: "02 · CONVOLUTION",
          title: "커널을 미끄러뜨리며 같은 질문을 반복한다",
          body: `
            <p>커널의 값과 이미지의 겹친 영역을 원소별로 곱해 더하면 출력 특성맵의 한 픽셀이 됩니다. 커널 하나는 세로 모서리, 질감처럼 하나의 패턴 탐지기를 학습하고, 필터 수만큼 출력 채널이 생깁니다.</p>
            <p>RGB 입력이라면 필터의 깊이도 3이며 세 채널을 함께 계산해 출력 채널 하나를 만듭니다. 커널 \\(K_h\\times K_w\\), 입력 채널 \\(C_{in}\\), 출력 채널 \\(C_{out}\\)인 Conv2D의 파라미터 수는 \\(K_hK_wC_{in}C_{out}+C_{out}\\)입니다.</p>
          `,
          equation: {
            label: "패딩과 스트라이드를 고려한 출력 크기",
            tex: S`H_{\mathrm{out}}=\left\lfloor\frac{H_{\mathrm{in}}+2P-K_h}{S}\right\rfloor+1,\qquad W_{\mathrm{out}}=\left\lfloor\frac{W_{\mathrm{in}}+2P-K_w}{S}\right\rfloor+1`,
            note: "same padding과 stride 1은 공간 크기를 유지하도록 패딩을 선택합니다."
          }
        },
        {
          id: "pooling",
          kicker: "03 · DOWNSAMPLING",
          title: "풀링은 위치 정밀도를 줄이고 존재를 남긴다",
          body: `
            <p>2×2 max pooling은 각 영역의 최댓값을 남겨 공간 크기를 줄입니다. 학습 파라미터가 없고 채널 수를 바꾸지 않습니다. 연산량과 메모리를 줄이며 작은 위치 변화에 덜 민감해지지만, 정확한 위치 정보도 잃습니다.</p>
            <p>현대 구조에서는 스트라이드 합성곱이나 global average pooling으로 대체하기도 합니다. 풀링은 “항상 필요한 규칙”이 아니라 해상도와 불변성을 교환하는 설계 선택입니다.</p>
          `
        },
        {
          id: "architecture",
          kicker: "04 · BUILD",
          title: "초기 층은 모서리, 깊은 층은 조합을 본다",
          body: `
            <p>합성곱–활성화–다운샘플링을 반복하면 수용 영역이 넓어지고 낮은 수준의 모서리가 질감·부분·객체로 조합됩니다. 마지막에는 특성맵을 Flatten하거나 평균내어 분류층에 전달합니다.</p>
          `,
          code: {
            title: "Fashion-MNIST CNN",
            content: `model = keras.Sequential([
    keras.Input(shape=(28, 28, 1)),
    keras.layers.Conv2D(32, 3, padding="same", activation="relu"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, 3, padding="same", activation="relu"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation="relu"),
    keras.layers.Dropout(0.4),
    keras.layers.Dense(10, activation="softmax"),
])`
          }
        },
        {
          id: "transfer",
          kicker: "05 · TRANSFER LEARNING",
          title: "이미 배운 시각 표현을 새 과업에 빌린다",
          body: `
            <p>ImageNet 같은 대규모 데이터로 학습한 모델의 초기 층은 여러 이미지 과업에 재사용 가능한 시각 특징을 담습니다. 작은 데이터에서는 합성곱 기반을 고정하고 새 분류기만 먼저 학습합니다. 이후 낮은 학습률로 상위 일부 층을 풀어 <strong>미세조정</strong>합니다.</p>
            <ol>
              <li>사전학습 기반을 불러오고 원래 분류 헤드를 제거합니다.</li>
              <li>기반을 동결하고 새 데이터용 출력층을 학습합니다.</li>
              <li>상위 블록 일부를 해제한 뒤 낮은 학습률로 다시 컴파일·미세조정합니다.</li>
            </ol>
            <div class="callout warning"><span class="callout-icon">!</span><div><strong>동결 상태를 바꾼 뒤에는 다시 compile하세요.</strong><p>Keras 옵티마이저가 훈련할 변수 목록을 갱신하도록 하는 중요한 단계입니다.</p></div></div>
          `
        }
      ],
      interactive: {
        type: "convolution",
        title: "3×3 커널 합성곱 계산기",
        instruction: "커널 종류와 스트라이드·패딩을 바꿔 출력 특성맵의 값과 크기를 직접 확인하세요."
      },
      quiz: [
        {
          q: "필터 32개를 사용한 Conv2D의 출력 채널 수는?",
          options: ["입력 채널과 항상 같음", "32", "커널 크기 3이면 3"],
          answer: 1,
          why: "필터 하나가 출력 특성맵 채널 하나를 만듭니다."
        },
        {
          q: "max pooling에 대한 설명으로 맞는 것은?",
          options: ["학습 가능한 가중치가 많다.", "공간 크기를 줄이고 채널 수는 보통 유지한다.", "항상 해상도를 두 배로 키운다."],
          answer: 1,
          why: "풀링은 윈도우 안 대표값을 선택하는 비학습 다운샘플링 연산입니다."
        },
        {
          q: "작은 새 이미지 데이터셋에서 전이학습의 자연스러운 첫 단계는?",
          options: ["모든 층을 큰 학습률로 즉시 재학습", "사전학습 기반을 동결하고 새 헤드 학습", "사전학습 가중치를 삭제"],
          answer: 1,
          why: "먼저 재사용 가능한 표현을 보존한 채 새 분류기를 안정적으로 맞춥니다."
        }
      ],
      sources: [
        ["TensorFlow Image classification", "https://www.tensorflow.org/tutorials/images/classification"],
        ["Keras Transfer learning & fine-tuning", "https://keras.io/guides/transfer_learning/"],
        ["Gradient-Based Learning Applied to Document Recognition", "https://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf"]
      ]
    },
    {
      id: "10-rnn",
      num: "10",
      phase: "deep",
      phaseLabel: "딥러닝",
      shortTitle: "시퀀스와 RNN",
      title: "이전 상태를 다음 판단에 건네기",
      subtitle: "텍스트·시계열의 순서를 보존하고 RNN을 시간축으로 펼쳐, LSTM·GRU가 긴 기억을 지키는 원리를 이해합니다.",
      summary: "순차 데이터, RNN, hidden state, BPTT, embedding, LSTM·GRU",
      question: "“Cats say ___”의 첫 단어를 마지막까지 어떻게 기억할까?",
      minutes: 50,
      keywords: ["순차데이터", "시계열", "RNN", "hidden state", "unrolling", "BPTT", "embedding", "LSTM", "GRU", "IMDB"],
      objectives: [
        "순차 데이터에서 표본 순서가 정보인 이유를 설명한다.",
        "RNN의 입력–은닉–출력 계산과 시간축 가중치 공유를 이해한다.",
        "LSTM·GRU의 게이트가 기울기와 기억 흐름을 돕는 방식을 설명한다."
      ],
      sections: [
        {
          id: "sequence",
          kicker: "01 · ORDER MATTERS",
          title: "같은 단어도 순서가 바뀌면 다른 데이터다",
          body: `
            <p>표 형태 데이터의 행은 대개 섞어도 의미가 유지되지만, 텍스트·음성·주가·동영상은 순서가 정보입니다. “개가 사람을 물었다”와 “사람이 개를 물었다”는 같은 단어 집합이지만 의미가 다릅니다.</p>
            <p>시퀀스 과업은 다음 값 예측, 전체 문장 분류, 입력 시퀀스를 다른 시퀀스로 변환하는 번역·캡션 생성 등으로 나뉩니다. 필요한 출력 위치에 따라 many-to-one, one-to-many, many-to-many 구조를 설계합니다.</p>
          `
        },
        {
          id: "rnn-cell",
          kicker: "02 · RECURRENCE",
          title: "현재 입력과 어제의 기억을 함께 계산한다",
          body: `
            <p>RNN 셀은 시점 \\(t\\)의 입력 \\(x_t\\)와 이전 은닉 상태 \\(h_{t-1}\\)를 받아 새 상태 \\(h_t\\)를 만듭니다. 같은 가중치 \\(W_x, W_h\\)를 모든 시점에서 공유하므로 길이가 다른 시퀀스에도 같은 규칙을 적용합니다.</p>
            <p>입력 특성 4개, 은닉 뉴런 3개라면 \\(W_x\\)는 4×3, \\(W_h\\)는 3×3, 편향은 3개로 총 24개 파라미터입니다. 시퀀스 길이가 늘어도 파라미터 수는 늘지 않지만 계산 단계와 저장할 activation은 늘어납니다.</p>
          `,
          equation: {
            label: "기본 RNN 셀",
            tex: S`h_t=\tanh(W_xx_t+W_hh_{t-1}+b),\qquad y_t=W_yh_t+c`,
            note: "마지막 hₜ만 쓰면 시퀀스 분류, 모든 yₜ를 쓰면 시점별 예측에 활용할 수 있습니다."
          }
        },
        {
          id: "unrolling",
          kicker: "03 · BPTT",
          title: "순환을 시간축으로 펼쳐 역전파한다",
          body: `
            <p>RNN을 시점마다 복사해 그리면 깊이가 시퀀스 길이인 피드포워드 네트워크처럼 보입니다. 역전파는 이 펼친 계산 그래프를 뒤로 따라가며 같은 공유 가중치가 각 시점에서 받은 기울기를 합칩니다. 이를 BPTT(Backpropagation Through Time)라고 합니다.</p>
            <p>긴 시퀀스에서는 작은 미분값이 반복 곱해져 앞부분 신호가 사라지는 기울기 소실, 큰 값이 반복되어 폭증하는 문제가 생깁니다. 기본 RNN이 “Cats”를 마지막 빈칸까지 기억하기 어려운 이유입니다.</p>
          `
        },
        {
          id: "embedding",
          kicker: "04 · TEXT INPUT",
          title: "단어 ID를 의미 있는 벡터로 바꾼다",
          body: `
            <p>단어를 정수 ID로 바꾼 값에는 크기 의미가 없습니다. ‘dog=10’이 ‘cat=2’보다 다섯 배 크다는 뜻이 아닙니다. Embedding 층은 각 토큰 ID를 학습 가능한 조밀 벡터로 조회합니다. 비슷한 맥락의 단어는 학습 과정에서 비슷한 방향에 놓일 수 있습니다.</p>
            <p>문장 길이를 맞추기 위한 padding은 실제 단어가 아니므로 mask로 후속 RNN이 무시하게 해야 합니다. 어휘 밖 단어, 최대 길이, 토큰화 방식은 모델 성능과 공정성에 직접 영향을 줍니다.</p>
          `
        },
        {
          id: "lstm-gru",
          kicker: "05 · GATED MEMORY",
          title: "무엇을 잊고, 쓰고, 읽을지 게이트로 정한다",
          body: `
            <p>LSTM은 별도의 셀 상태 \\(c_t\\)에 비교적 방해받지 않는 정보 통로를 만들고, forget·input·output gate가 정보 흐름을 조절합니다. GRU는 update·reset gate로 이를 더 단순하게 결합합니다.</p>
            <table class="comparison-table">
              <thead><tr><th>셀</th><th>상태</th><th>특징</th></tr></thead>
              <tbody>
                <tr><td>Simple RNN</td><td>\\(h_t\\)</td><td>가볍지만 긴 의존성 학습이 어려움</td></tr>
                <tr><td>LSTM</td><td>\\(h_t,c_t\\)</td><td>세 게이트와 셀 상태, 표현력이 크고 파라미터가 많음</td></tr>
                <tr><td>GRU</td><td>\\(h_t\\)</td><td>두 게이트로 단순화, 종종 비슷한 성능과 빠른 학습</td></tr>
              </tbody>
            </table>
            <p>현대 NLP의 중심은 병렬화와 긴 범위 관계에 유리한 Transformer로 이동했지만, RNN은 스트리밍·작은 모델·시계열에서 여전히 중요한 기본기입니다.</p>
          `,
          code: {
            title: "텍스트 감성 분류의 층 흐름",
            content: `model = keras.Sequential([
    text_vectorizer,
    keras.layers.Embedding(vocab_size, 64, mask_zero=True),
    keras.layers.Bidirectional(keras.layers.LSTM(64)),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(1)
])
model.compile(
    optimizer=keras.optimizers.Adam(1e-4),
    loss=keras.losses.BinaryCrossentropy(from_logits=True),
    metrics=["accuracy"]
)`
          }
        }
      ],
      interactive: {
        type: "rnn",
        title: "은닉 상태가 문장을 통과하는 법",
        instruction: "토큰을 한 단계씩 보내며 입력과 이전 상태가 새 기억에 기여하는 값을 살펴보세요."
      },
      quiz: [
        {
          q: "RNN이 모든 타임스텝에서 공유하는 것은?",
          options: ["입력 토큰", "셀의 가중치", "항상 같은 은닉 상태 값"],
          answer: 1,
          why: "같은 변환 규칙의 가중치를 시간축 전체에서 재사용하며 상태 값은 시점마다 바뀝니다."
        },
        {
          q: "기본 RNN의 긴 의존성 학습을 어렵게 하는 대표 문제는?",
          options: ["항상 파라미터가 0개임", "기울기 소실·폭증", "입력 순서를 보존함"],
          answer: 1,
          why: "시간축으로 긴 연쇄 미분이 반복되며 기울기가 매우 작아지거나 커질 수 있습니다."
        },
        {
          q: "Embedding 층이 하는 일은?",
          options: ["토큰 ID를 학습 가능한 조밀 벡터로 매핑", "문장을 무조건 한 단어로 축약", "모든 단어를 같은 벡터로 변경"],
          answer: 0,
          why: "정수 ID를 의미 비교가 가능한 연속 공간의 벡터 표현으로 바꿉니다."
        }
      ],
      sources: [
        ["TensorFlow Text classification with an RNN", "https://www.tensorflow.org/text/tutorials/text_classification_rnn"],
        ["Long Short-Term Memory", "https://www.bioinf.jku.at/publications/older/2604.pdf"],
        ["Learning Phrase Representations using RNN Encoder–Decoder", "https://arxiv.org/abs/1406.1078"]
      ]
    },
    {
      id: "11-anomaly",
      num: "11",
      phase: "frontier",
      phaseLabel: "응용",
      shortTitle: "이상 탐지",
      title: "정상이 무엇인지 배워 낯선 것을 찾기",
      subtitle: "라벨 유무에 따라 XGBoost·오토인코더·GAN을 선택하고, 재구성 오차·임곗값·ROC-AUC의 함정을 짚습니다.",
      summary: "이상치 정의, XGBoost, Autoencoder, GAN, 재구성 오차, ROC-AUC",
      question: "공격이 어떤 모습인지 몰라도 네트워크 이상을 잡을 수 있을까?",
      minutes: 58,
      keywords: ["이상탐지", "KDD99", "XGBoost", "Autoencoder", "재구성오차", "GAN", "ROC", "AUC", "불균형", "threshold", "adversarial"],
      objectives: [
        "라벨·이상 패턴 가정에 따라 지도·비지도 이상 탐지법을 선택한다.",
        "오토인코더의 재구성 오차와 임곗값 설정을 설명한다.",
        "불균형 데이터에서 ROC-AUC 외에 PR-AUC와 운영 지표가 필요한 이유를 이해한다."
      ],
      sections: [
        {
          id: "define-anomaly",
          kicker: "01 · PROBLEM FRAMING",
          title: "이상은 ‘드문 점’보다 ‘다른 생성 과정’",
          body: `
            <p>이상치는 다른 데이터와 크게 다르거나, 정상과 다른 메커니즘에서 생긴 관측입니다. 네트워크 침입, 사기, 설비 고장, 의료 경고처럼 발견의 가치가 크지만 이상 자체가 다양하고 희귀해 라벨을 모으기 어렵습니다.</p>
            <p>먼저 <strong>point anomaly</strong>(한 점이 이상), <strong>contextual anomaly</strong>(맥락 안에서만 이상), <strong>collective anomaly</strong>(연속 패턴 전체가 이상)를 구분하세요. 한겨울 30°C는 맥락 이상이고, 짧은 요청 폭주 시퀀스는 집단 이상일 수 있습니다.</p>
            <div class="callout warning"><span class="callout-icon">!</span><div><strong>이상 점수와 비즈니스 사고는 같지 않습니다.</strong><p>센서 고장, 신규 고객, 합법적인 대형 거래도 통계적으로 낯설 수 있습니다. 탐지 후 조사·피드백 흐름이 필요합니다.</p></div></div>
          `
        },
        {
          id: "choose-method",
          kicker: "02 · SUPERVISION",
          title: "라벨이 있으면 구분을, 없으면 정상을 모델링한다",
          body: `
            <table class="comparison-table">
              <thead><tr><th>상황</th><th>접근</th><th>대표 방법</th><th>주요 위험</th></tr></thead>
              <tbody>
                <tr><td>충분한 정상/이상 라벨</td><td>지도 이진·다중 분류</td><td>XGBoost</td><td>과거 공격 유형에만 맞음, 불균형</td></tr>
                <tr><td>정상 데이터가 대부분</td><td>정상 표현·분포 학습</td><td>Autoencoder, one-class</td><td>훈련에 이상이 섞임, 임곗값</td></tr>
                <tr><td>복잡한 비가우시안 분포</td><td>생성 모델로 정상 분포 근사</td><td>GAN 계열</td><td>학습 불안정, 점수 해석</td></tr>
              </tbody>
            </table>
            <p>KDD Cup 99 같은 네트워크 로그는 수치·범주 특성이 섞여 있습니다. 지도 분류에서는 공격 라벨을 사용하고, 비지도 학습에서는 정상 데이터의 규칙을 압축·복원하거나 정상 분포와의 거리를 점수화합니다. 범주형 특성은 one-hot 또는 entity embedding으로 표현할 수 있습니다.</p>
          `
        },
        {
          id: "xgboost",
          kicker: "03 · SUPERVISED",
          title: "XGBoost는 이전 트리의 실수를 보정한다",
          body: `
            <p>Gradient Boosted Trees는 트리를 하나씩 더하며 현재 모델의 손실 기울기를 보정합니다. XGBoost는 정규화된 목적함수, 가지치기, 결측값 방향 학습, 효율적인 분할 탐색과 병렬 계산을 갖춘 구현입니다.</p>
            <p>네트워크 공격처럼 불균형한 분류에서는 정확도보다 recall, precision, PR-AUC를 확인하고 클래스 가중치나 표본 전략을 검증 폴드 안에서 적용해야 합니다. 같은 호스트나 시간 구간이 훈련과 테스트에 동시에 들어가면 성능이 부풀려질 수 있습니다.</p>
          `,
          equation: {
            label: "부스팅의 가법 모델",
            tex: S`\hat y_i^{(t)}=\hat y_i^{(t-1)}+\eta f_t(x_i),\qquad \mathcal L^{(t)}=\sum_i\ell\!\left(y_i,\hat y_i^{(t)}\right)+\Omega(f_t)`,
            note: "η는 shrinkage 학습률, Ω는 트리 복잡도 규제입니다."
          }
        },
        {
          id: "autoencoder",
          kicker: "04 · RECONSTRUCTION",
          title: "정상을 잘 복원하도록 압축한다",
          body: `
            <p>오토인코더는 인코더가 입력을 낮은 차원의 잠재 표현 \\(z\\)로 압축하고, 디코더가 원래 입력을 복원합니다. 정상 데이터만 또는 정상 비율이 매우 높은 데이터로 학습하면 반복되는 정상 구조를 잘 복원합니다. 낯선 이상은 잠재 표현에 맞지 않아 재구성 오차가 커질 것이라는 가정입니다.</p>
            <p>연속 특성은 표준화하고, 범주형 특성은 one-hot/embedding으로 처리합니다. 단순 MSE는 큰 단위 특성이 점수를 지배하므로 전처리와 특성별 손실 가중치가 중요합니다. 시계열에서는 일정 길이 창을 만들고 LSTM·1D CNN 오토인코더로 패턴을 복원할 수 있습니다.</p>
          `,
          equation: {
            label: "재구성 오차 기반 이상 점수",
            tex: S`z=f_{\theta}(x),\qquad \hat x=g_{\phi}(z),\qquad s(x)=\frac{1}{d}\sum_{j=1}^{d}(x_j-\hat x_j)^2`,
            note: "검증용 정상·이상 표본 또는 허용 가능한 경보량을 이용해 s(x)의 임곗값 τ를 정합니다."
          }
        },
        {
          id: "gan",
          kicker: "05 · GENERATIVE",
          title: "생성자와 판별자의 게임으로 분포를 배운다",
          body: `
            <p>GAN의 생성자 \\(G\\)는 잡음에서 가짜 표본을 만들고, 판별자 \\(D\\)는 실제와 가짜를 구분합니다. 생성자는 판별자를 속이도록, 판별자는 더 잘 구분하도록 경쟁하며 데이터 분포를 근사합니다. 이상 탐지에서는 판별 점수, 잠재 공간으로의 복원 오차, 중간 특징의 차이를 조합할 수 있습니다.</p>
            <p>GAN은 기울기 소실, 두 모델의 비수렴, 일부 유형만 생성하는 mode collapse가 어렵습니다. WGAN은 확률 분류 대신 실수 점수를 내는 critic과 Wasserstein 거리 근사를 사용해 더 유용한 기울기를 제공하려고 합니다. 복잡성이 큰 만큼 오토인코더보다 항상 낫다고 가정해서는 안 됩니다.</p>
          `,
          equation: {
            label: "원래 GAN의 미니맥스 목적",
            tex: S`\min_G\max_D\ \mathbb E_{x\sim p_{\text{data}}}[\log D(x)]+\mathbb E_{z\sim p(z)}[\log(1-D(G(z)))]`,
            note: "실제 학습은 안정성을 위해 생성자 손실을 -log D(G(z))로 바꾸는 등 다양한 변형을 사용합니다."
          }
        },
        {
          id: "evaluation",
          kicker: "06 · THRESHOLD",
          title: "좋은 점수보다 쓸 수 있는 임곗값",
          body: `
            <p>임곗값을 낮추면 더 많은 이상을 잡아 true positive rate가 오르지만 정상 경보도 늘어 false positive rate가 증가합니다. ROC 곡선은 모든 임곗값의 TPR–FPR을, AUC는 무작위 양성 표본이 무작위 음성보다 높은 점수를 받을 확률로 해석할 수 있습니다.</p>
            <p>이상이 0.1%인 극단적 불균형에서는 FPR 1%도 실제 경보 대부분을 오탐으로 만들 수 있습니다. 그래서 precision–recall 곡선, 상위 K개 경보의 적중률, 시간당 경보 수, 탐지 지연, 조사 비용을 함께 봐야 합니다.</p>
          `,
          equation: {
            label: "핵심 분류 지표",
            tex: S`\mathrm{TPR}=\frac{TP}{TP+FN},\qquad \mathrm{FPR}=\frac{FP}{FP+TN},\qquad \mathrm{Precision}=\frac{TP}{TP+FP}`,
            note: "운영 임곗값은 AUC가 정하지 않습니다. 놓침과 오탐의 비용, 조사 인력, 경보 예산을 반영해야 합니다."
          }
        }
      ],
      interactive: {
        type: "anomaly",
        title: "임곗값과 경보 예산",
        instruction: "이상 점수 임곗값을 움직여 recall·precision·오탐 수의 교환을 확인하세요."
      },
      quiz: [
        {
          q: "오토인코더 이상 탐지의 핵심 가정은?",
          options: ["이상 데이터가 항상 더 작은 값을 가짐", "정상 패턴은 잘 복원되고 낯선 패턴은 복원 오차가 큼", "모든 입력을 완벽히 복원해야 함"],
          answer: 1,
          why: "정상 구조를 학습한 모델의 재구성 실패를 이상 점수로 사용합니다."
        },
        {
          q: "이상이 매우 희귀할 때 ROC-AUC만으로 부족한 이유는?",
          options: ["ROC는 임곗값을 하나만 봐서", "낮은 FPR도 절대 오탐 수가 매우 클 수 있어서", "AUC는 회귀에서만 써서"],
          answer: 1,
          why: "정상 표본이 압도적으로 많으면 작은 비율의 오탐도 경보 대부분을 차지할 수 있어 precision과 운영량을 봐야 합니다."
        },
        {
          q: "GAN의 대표적인 학습 문제인 mode collapse는?",
          options: ["생성자가 제한된 몇 유형만 반복 생성", "판별자가 항상 정답 라벨을 제공", "입력 차원이 자동으로 증가"],
          answer: 0,
          why: "생성자가 데이터 분포의 다양한 모드를 덮지 못하고 판별자를 잘 속이는 일부 출력에 집중하는 현상입니다."
        }
      ],
      sources: [
        ["KDD Cup 1999 Data", "https://kdd.ics.uci.edu/databases/kddcup99/kddcup99.html"],
        ["XGBoost: A Scalable Tree Boosting System", "https://arxiv.org/abs/1603.02754"],
        ["Auto-Encoding Variational Bayes", "https://arxiv.org/abs/1312.6114"],
        ["Generative Adversarial Nets", "https://arxiv.org/abs/1406.2661"],
        ["Wasserstein GAN", "https://arxiv.org/abs/1701.07875"],
        ["scikit-learn ROC metrics", "https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics"]
      ]
    }
  ];

  window.MEDIA = [
    {
      type: "VIDEO · 19 MIN",
      title: "But what is a neural network?",
      creator: "3Blue1Brown · Neural Networks Chapter 1",
      videoId: "aircAruvnKk",
      href: "https://www.youtube.com/watch?v=aircAruvnKk",
      chapter: "08"
    },
    {
      type: "VIDEO · 21 MIN",
      title: "Gradient descent, how neural networks learn",
      creator: "3Blue1Brown · Neural Networks Chapter 2",
      videoId: "IHZwWFHWa-w",
      href: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
      chapter: "05 · 08"
    },
    {
      type: "VIDEO · 22 MIN",
      title: "But what is a convolution?",
      creator: "3Blue1Brown · Visual introduction",
      videoId: "KuXjwB4LzSA",
      href: "https://www.youtube.com/watch?v=KuXjwB4LzSA",
      chapter: "09"
    },
    {
      type: "VIDEO · 13 MIN",
      title: "What is backpropagation really doing?",
      creator: "3Blue1Brown · Neural Networks Chapter 3",
      videoId: "Ilg3gGewQ5U",
      href: "https://www.youtube.com/watch?v=Ilg3gGewQ5U",
      chapter: "08"
    },
    {
      type: "VIDEO · 10 MIN",
      title: "Backpropagation calculus",
      creator: "3Blue1Brown · Neural Networks Chapter 4",
      videoId: "tIeHLnjs5U8",
      href: "https://www.youtube.com/watch?v=tIeHLnjs5U8",
      chapter: "08"
    },
    {
      type: "VIDEO · 27 MIN",
      title: "Transformers, the tech behind LLMs",
      creator: "3Blue1Brown · Attention & Transformers",
      videoId: "wjZofJX0v4M",
      href: "https://www.youtube.com/watch?v=wjZofJX0v4M",
      chapter: "10 · NEXT"
    }
  ];
})();
