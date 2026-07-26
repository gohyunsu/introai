/* Additional original diagrams placed beside the matching mastery explanations. */
(() => {
  const chapters = window.CHAPTERS || [];
  const visuals = window.VISUALS || [];

  const additions = [
    {
      id: "learning-loop",
      kind: "SYSTEM LOOP · ORIGINAL SVG",
      chapter: "01",
      title: "모델을 둘러싼 AI 시스템의 순환",
      description: "문제 정의부터 데이터, 학습, 평가, 배포, 피드백까지 이어지는 전체 순환을 따라가며 모델 밖의 결정을 확인합니다.",
      src: "assets/visuals/learning-loop.svg",
      alt: "문제 정의, 데이터, 모델, 평가, 배포, 피드백이 순환하는 AI 시스템 흐름도",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://developers.google.com/machine-learning/intro-to-ml",
      home: false
    },
    {
      id: "knn-k-effect",
      kind: "BIAS–VARIANCE · ORIGINAL SVG",
      chapter: "02",
      title: "k가 바꾸는 결정 경계와 일반화",
      description: "작은 k의 복잡한 경계와 큰 k의 매끄러운 경계를 비교해 과대적합과 과소적합을 한눈에 연결합니다.",
      src: "assets/visuals/knn-k-effect.svg",
      alt: "k가 1, 5, 15로 커질수록 K-NN 결정 경계가 단순해지는 세 패널 비교",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/neighbors.html",
      home: false
    },
    {
      id: "data-shapes",
      kind: "DATA CONTRACT · ORIGINAL SVG",
      chapter: "03",
      title: "표와 이미지가 모델에 들어가는 모양",
      description: "표 데이터의 (표본, 특성), 이미지 배치의 (배치, 높이, 너비, 채널), 펼친 벡터의 shape를 연결합니다.",
      src: "assets/visuals/data-shapes.svg",
      alt: "표 데이터, 이미지 배치, 펼친 이미지 벡터의 차원과 축을 비교한 데이터 형태 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://numpy.org/doc/stable/reference/generated/numpy.reshape.html",
      home: false
    },
    {
      id: "regularization-coefficients",
      kind: "REGULARIZATION · ORIGINAL SVG",
      chapter: "04",
      title: "Ridge와 Lasso가 계수를 줄이는 방식",
      description: "규제가 없는 회귀, 모든 계수를 부드럽게 줄이는 Ridge, 일부 계수를 0으로 만드는 Lasso를 나란히 비교합니다.",
      src: "assets/visuals/regularization-coefficients.svg",
      alt: "OLS, Ridge, Lasso의 회귀 계수 크기와 0이 되는 계수를 막대그래프로 비교한 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/linear_model.html",
      home: false
    },
    {
      id: "confusion-matrix",
      kind: "EVALUATION · ORIGINAL SVG",
      chapter: "05",
      title: "혼동행렬에서 정밀도와 재현율 읽기",
      description: "TP·FP·FN·TN의 위치를 먼저 고정하고, 예측 양성과 실제 양성 중 어느 분모를 보는지 구분합니다.",
      src: "assets/visuals/confusion-matrix.svg",
      alt: "실제 클래스와 예측 클래스로 구성한 이진 혼동행렬과 정밀도 및 재현율 계산식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/model_evaluation.html#confusion-matrix",
      home: false
    },
    {
      id: "tree-split",
      kind: "IMPURITY · ORIGINAL SVG",
      chapter: "06",
      title: "한 번의 분할이 불순도를 줄이는 과정",
      description: "임곗값 질문이 섞인 부모 표본을 더 순수한 자식 노드로 나누는 모습을 Gini 불순도와 함께 읽습니다.",
      src: "assets/visuals/tree-split.svg",
      alt: "두 클래스가 섞인 부모 노드가 임곗값 질문으로 두 개의 더 순수한 자식 노드로 나뉘는 결정트리 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/tree.html",
      home: false
    },
    {
      id: "pca-reconstruction",
      kind: "DIMENSION REDUCTION · ORIGINAL SVG",
      chapter: "07",
      title: "PCA로 압축하고 다시 복원하기",
      description: "이미지를 벡터로 펼치고 주성분 k개로 압축한 뒤 역변환하여 설명 분산과 복원 오차를 해석합니다.",
      src: "assets/visuals/pca-reconstruction.svg",
      alt: "이미지를 만 차원 벡터로 펼쳐 PCA 주성분으로 압축하고 다시 복원하는 흐름도",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
      home: false
    },
    {
      id: "backprop-chain",
      kind: "GRADIENT FLOW · ORIGINAL SVG",
      chapter: "08",
      title: "순전파와 역전파의 두 방향",
      description: "입력에서 손실까지 값을 계산한 뒤 연쇄법칙으로 각 가중치의 기울기를 되돌려 보내는 흐름입니다.",
      src: "assets/visuals/backprop-chain.svg",
      alt: "입력에서 손실로 가는 순전파와 손실에서 가중치 업데이트로 돌아가는 역전파를 비교한 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://www.tensorflow.org/guide/autodiff",
      home: false
    },
    {
      id: "convolution-window",
      kind: "CONVOLUTION · ORIGINAL SVG",
      chapter: "09",
      title: "필터 하나가 특징맵 한 칸을 만드는 법",
      description: "3×3 필터가 입력의 작은 영역과 원소별 곱을 한 뒤 합산하고, 같은 가중치를 이동하며 공유하는 과정을 보여 줍니다.",
      src: "assets/visuals/convolution-window.svg",
      alt: "입력 이미지의 3 곱하기 3 영역에 커널을 적용해 출력 특징맵의 한 값을 계산하는 합성곱 도식",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://www.tensorflow.org/tutorials/images/cnn",
      home: false
    },
    {
      id: "lstm-gates",
      kind: "MEMORY GATES · ORIGINAL SVG",
      chapter: "10",
      title: "LSTM의 지우기·쓰기·읽기",
      description: "셀 상태의 장기 경로와 망각·입력·출력 게이트가 시점별 기억을 조절하는 역할을 분리해 봅니다.",
      src: "assets/visuals/lstm-gates.svg",
      alt: "LSTM 셀 상태 경로와 망각 게이트, 입력 게이트, 출력 게이트의 연결 구조",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://www.bioinf.jku.at/publications/older/2604.pdf",
      home: false
    },
    {
      id: "dli-lab-ladder",
      kind: "LAB ROADMAP · ORIGINAL SVG",
      chapter: "11",
      title: "NVIDIA 딥러닝 실습의 단계별 경로",
      description: "환경 점검과 MNIST에서 시작해 ASL·CNN·증강·전이학습·LSTM·평가로 이어지는 실습 의존관계를 정리합니다.",
      src: "assets/visuals/dli-lab-ladder.svg",
      alt: "주피터 환경, MNIST, ASL, CNN, 증강과 배포, VGG 전이학습, LSTM으로 올라가는 실습 계단",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://www.nvidia.com/en-us/training/instructor-led-workshops/fundamentals-of-deep-learning/",
      home: false
    },
    {
      id: "anomaly-score",
      kind: "ALERT POLICY · ORIGINAL SVG",
      chapter: "12",
      title: "이상 점수를 운영 경보로 바꾸는 임곗값",
      description: "겹치는 정상·이상 점수 분포에서 임곗값을 움직이며 놓친 이상과 거짓 경보의 균형을 해석합니다.",
      src: "assets/visuals/anomaly-score.svg",
      alt: "정상과 이상 점수 분포, 임곗값, 거짓 양성과 거짓 음성 영역을 표시한 그래프",
      author: "Introduction to AI companion",
      license: "Original diagram · MIT",
      source: "https://scikit-learn.org/stable/modules/model_evaluation.html#precision-recall-f-measure-metrics",
      home: false
    }
  ];

  visuals.push(...additions.filter(item => !visuals.some(existing => existing.id === item.id)));

  const placements = {
    "01-ai-map": ["system-boundary-mastery", "learning-loop"],
    "02-ml-knn": ["knn-prediction-trace", "knn-k-effect"],
    "03-data": ["split-strategy-mastery", "data-shapes"],
    "04-regression": ["residual-diagnostics-mastery", "regularization-coefficients"],
    "05-classification": ["score-probability-decision", "confusion-matrix"],
    "06-trees": ["ensemble-diversity-mastery", "tree-split"],
    "07-unsupervised": ["unsupervised-evidence-mastery", "pca-reconstruction"],
    "08-deep-learning": ["gradient-debugging-mastery", "backprop-chain"],
    "09-cnn": ["cnn-error-analysis-mastery", "convolution-window"],
    "10-rnn": ["sequence-evaluation-mastery", "lstm-gates"],
    "11-dli-practicum": ["reproducible-lab-protocol", "dli-lab-ladder"],
    "12-anomaly": ["anomaly-operations-mastery", "anomaly-score"]
  };

  Object.entries(placements).forEach(([chapterId, [sectionId, visualId]]) => {
    const chapter = chapters.find(item => item.id === chapterId);
    const section = chapter?.sections.find(item => item.id === sectionId);
    if (!section) return;
    section.visuals = [...new Set([...(section.visuals || []), visualId])];
  });

  if (window.THEORY_COVERAGE) {
    window.THEORY_COVERAGE.visuals = visuals.length;
  }
})();
