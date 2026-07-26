/* Original guided lab reconstructions. No lecture notebooks or private datasets are bundled. */
(() => {
  const S = String.raw;
  const chapters = window.CHAPTERS || [];

  function insertAfter(chapterId, anchorId, additions) {
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) return;
    const anchor = chapter.sections.findIndex((section) => section.id === anchorId);
    chapter.sections.splice(anchor < 0 ? chapter.sections.length : anchor + 1, 0, ...additions);
  }

  function labIntro({ goal, input, output, checks }) {
    return S`
      <div class="lab-brief">
        <span>GUIDED LAB</span>
        <dl>
          <div><dt>목표</dt><dd>${goal}</dd></div>
          <div><dt>입력</dt><dd>${input}</dd></div>
          <div><dt>출력</dt><dd>${output}</dd></div>
          <div><dt>확인</dt><dd>${checks}</dd></div>
        </dl>
      </div>
    `;
  }

  insertAfter("02-ml-knn", "fit-api", [
    {
      id: "fish-knn-lab",
      kicker: "08 · GUIDED LAB",
      title: "도미와 빙어: 첫 분류 실습을 처음부터 끝까지",
      body: labIntro({
        goal: "길이·무게 두 특성으로 두 생선 클래스를 구분한다.",
        input: "X.shape=(샘플 수, 2), y.shape=(샘플 수,)",
        output: "새 생선의 클래스와 테스트 정확도",
        checks: "산점도, 클래스 비율, 이웃 좌표, k에 따른 성능"
      }) + S`
        <p>먼저 입력과 타깃을 만들고 산점도로 두 클래스의 배치를 확인합니다. 아래 코드는 원본 수업 파일을 공개하지 않기 위해 작은 예시 배열을 사용하지만, 실제 실습에서도 데이터 준비 이후의 흐름은 같습니다.</p>
      `,
      codes: [
        {
          title: "1/3 · 데이터의 행과 열 만들기",
          content: `import numpy as np
import matplotlib.pyplot as plt

# 각 행은 [길이, 무게], 타깃 1=도미, 0=빙어
X = np.array([
    [25.4, 242], [29.0, 430], [32.0, 600], [38.5, 920],
    [9.8, 6.7], [11.2, 9.8], [12.4, 13.4], [15.0, 19.9]
])
y = np.array([1, 1, 1, 1, 0, 0, 0, 0])

print(X.shape, y.shape)
plt.scatter(X[y == 1, 0], X[y == 1, 1], label="bream")
plt.scatter(X[y == 0, 0], X[y == 0, 1], label="smelt")
plt.xlabel("length"); plt.ylabel("weight"); plt.legend()`
        },
        {
          title: "2/3 · 계층 분할과 K-NN 학습",
          content: `from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)
model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=3)
)
model.fit(X_train, y_train)
print("test accuracy:", model.score(X_test, y_test))`
        },
        {
          title: "3/3 · 예측을 이웃과 함께 해석",
          content: `sample = np.array([[30.0, 600.0]])
print("class:", model.predict(sample))
print("probability:", model.predict_proba(sample))

# Pipeline 안 스케일러와 K-NN을 분리해 이웃 확인
scaled = model.named_steps["standardscaler"].transform(sample)
distance, index = model.named_steps["kneighborsclassifier"].kneighbors(scaled)
print("neighbor labels:", y_train[index[0]])
print("neighbor distances:", distance[0])`
        }
      ],
      afterBody: S`
        <h3>결과를 이렇게 읽습니다</h3>
        <p>정확도만 보지 말고 이웃의 클래스와 거리를 확인합니다. \(k\)를 1, 3, 5로 바꾸어 훈련·테스트 점수를 비교하면 작은 \(k\)의 민감성과 큰 \(k\)의 평활화를 직접 볼 수 있습니다. 데이터가 매우 작을 때 한 번의 테스트 분할 점수는 크게 흔들리므로 교차검증이 더 적절할 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("03-data", "scaling-without-leakage", [
    {
      id: "split-scale-lab",
      kicker: "08 · GUIDED LAB",
      title: "섞기·계층 분할·표준화를 누출 없이 연결하기",
      body: labIntro({
        goal: "샘플링 편향과 특성 스케일 왜곡을 동시에 막는다.",
        input: "두 클래스의 길이·무게 행렬",
        output: "분할별 클래스 비율과 표준화된 예측",
        checks: "random_state 재현성, stratify 비율, 훈련 통계 재사용"
      }) + S`
        <p>앞 35개가 모두 도미이고 뒤 14개가 빙어인 배열을 순서대로 자르면 훈련에는 한 클래스만 들어갑니다. <code>train_test_split</code>은 섞기와 계층 분할을 함께 처리합니다.</p>
      `,
      codes: [
        {
          title: "1/2 · 클래스 비율을 보존해 분할",
          content: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.25,
    stratify=y,
    random_state=42
)
print(np.unique(y_train, return_counts=True))
print(np.unique(y_test, return_counts=True))`
        },
        {
          title: "2/2 · 훈련 평균·표준편차만 사용",
          content: `mean = X_train.mean(axis=0)
std = X_train.std(axis=0)

X_train_scaled = (X_train - mean) / std
X_test_scaled = (X_test - mean) / std
sample_scaled = (np.array([[25, 150]]) - mean) / std

kn.fit(X_train_scaled, y_train)
print(kn.predict(sample_scaled))`
        }
      ],
      afterBody: S`
        <p>수동 표준화와 <code>StandardScaler</code>의 핵심은 같습니다. 실무에서는 Pipeline이 교차검증 폴드마다 훈련 부분의 통계만 다시 계산하므로 더 안전합니다. <code>random_state</code>는 무작위성을 없애는 값이 아니라 같은 무작위 결과를 재현하는 값입니다.</p>
      `
    },
    {
      id: "eda-lab",
      kicker: "11 · GUIDED LAB",
      title: "실제 표 데이터를 받았을 때의 탐색 순서",
      body: labIntro({
        goal: "모델 전에 결측·분포·상관·공간 패턴을 확인한다.",
        input: "행과 열로 된 DataFrame",
        output: "데이터 품질 보고와 모델링 가설",
        checks: "dtype, 결측률, 분위수, 중복, 타깃 분포"
      }) + S`
        <p>탐색은 예쁜 그래프를 만드는 단계가 아니라 “각 행은 무엇인가, 이 열을 예측 시점에 알 수 있는가, 값의 범위가 현실적인가”를 확인하는 과정입니다.</p>
      `,
      codes: [
        {
          title: "데이터 품질과 관계를 한 번에 점검",
          content: `import pandas as pd
import matplotlib.pyplot as plt

print(df.shape)
print(df.info())
print(df.isna().mean().sort_values(ascending=False).head())
print(df.describe(include="all").T)
print("duplicates:", df.duplicated().sum())

numeric = df.select_dtypes("number")
print(numeric.corr(numeric_only=True))
numeric.hist(figsize=(12, 8), bins=30)
plt.tight_layout()`
        },
        {
          title: "연속 소득을 구간화해 계층 샘플링",
          content: `from sklearn.model_selection import StratifiedShuffleSplit

# 표본 대표성에 중요한 소득 구간을 임시 층화 기준으로 사용
df["income_cat"] = pd.cut(
    df["median_income"],
    bins=[0, 1.5, 3.0, 4.5, 6.0, np.inf],
    labels=[1, 2, 3, 4, 5]
)
splitter = StratifiedShuffleSplit(
    n_splits=1, test_size=0.2, random_state=42
)
train_idx, test_idx = next(splitter.split(df, df["income_cat"]))
train = df.iloc[train_idx].drop(columns="income_cat")
test = df.iloc[test_idx].drop(columns="income_cat")`
        },
        {
          title: "위치·인구·가격을 한 화면에 표현",
          content: `train.plot(
    kind="scatter", x="longitude", y="latitude",
    alpha=0.35,
    s=train["population"] / 100,
    c="median_house_value",
    cmap="viridis",
    colorbar=True,
    figsize=(10, 7)
)
plt.show()`
        }
      ],
      afterBody: S`
        <p>위도·경도가 있다면 투명도 <code>alpha</code>를 낮춘 산점도로 밀집도를 봅니다. 타깃을 색이나 점 크기로 표현할 때는 그래프를 보고 만든 새 특성도 검증 절차 안에서 평가해야 합니다.</p>
      `
    }
  ]);

  insertAfter("04-regression", "extrapolation", [
    {
      id: "perch-regression-lab",
      kicker: "05 · GUIDED LAB",
      title: "농어 무게 예측: 이웃 평균에서 다항 회귀까지",
      body: labIntro({
        goal: "K-NN 회귀의 외삽 한계를 확인하고 선형·다항 모델로 해결한다.",
        input: "농어 길이 X와 무게 y",
        output: "50cm·100cm 예측, MAE와 R²",
        checks: "2차원 입력, 훈련/테스트 점수, 관측 범위 밖 곡선"
      }) + S`
        <p>회귀용 scikit-learn 입력도 \((n,p)\)의 2차원이어야 합니다. 길이 하나만 사용할 때 \((n,)\)을 \((n,1)\)로 바꿉니다.</p>
      `,
      codes: [
        {
          title: "1/3 · K-NN 회귀와 MAE",
          content: `from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error

X_train = np.asarray(train_length).reshape(-1, 1)
X_test = np.asarray(test_length).reshape(-1, 1)

knr = KNeighborsRegressor(n_neighbors=5)
knr.fit(X_train, y_train)
pred = knr.predict(X_test)
print("train R2:", knr.score(X_train, y_train))
print("test R2:", knr.score(X_test, y_test))
print("test MAE:", mean_absolute_error(y_test, pred))`
        },
        {
          title: "2/3 · 외삽 한계를 숫자로 확인",
          content: `knr3 = KNeighborsRegressor(n_neighbors=3).fit(X_train, y_train)
print(knr3.predict([[50]]))
print(knr3.predict([[100]]))

# 두 입력이 같은 최대 이웃들을 참조하면 같은 평균을 반환할 수 있음
print(knr3.kneighbors([[100]], return_distance=True))`
        },
        {
          title: "3/3 · 선형과 2차 다항 회귀",
          content: `from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

linear = LinearRegression().fit(X_train, y_train)
quadratic = make_pipeline(
    PolynomialFeatures(degree=2, include_bias=False),
    LinearRegression()
).fit(X_train, y_train)

for length in [50, 100]:
    print(length, linear.predict([[length]]), quadratic.predict([[length]]))`
        }
      ],
      afterBody: S`
        <p>다항 회귀도 무조건 현실적인 외삽을 보장하지 않습니다. 예측 곡선을 관측 범위보다 넓게 그려 음수 무게나 폭발적 증가가 없는지 확인하고, 물리 지식이 있다면 로그 변환이나 제약이 있는 모델을 고려합니다.</p>
      `
    }
  ]);

  insertAfter("04-regression", "ridge-lasso-detail", [
    {
      id: "regularized-regression-lab",
      kicker: "10 · GUIDED LAB",
      title: "다항 특성·표준화·Ridge/Lasso를 한 파이프라인으로",
      body: labIntro({
        goal: "특성 확장으로 생긴 과대적합을 규제로 제어한다.",
        input: "길이·높이·두께의 다중 특성",
        output: "교차검증으로 선택한 alpha와 테스트 R²",
        checks: "PolynomialFeatures 열 수, 스케일링, 0이 된 Lasso 계수"
      }),
      codes: [
        {
          title: "1/2 · Ridge alpha를 교차검증으로 선택",
          content: `from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

pipe = make_pipeline(
    PolynomialFeatures(degree=3, include_bias=False),
    StandardScaler(),
    Ridge()
)
search = GridSearchCV(
    pipe,
    {"ridge__alpha": [0.001, 0.01, 0.1, 1, 10, 100]},
    cv=5,
    scoring="r2"
)
search.fit(X_train, y_train)
print(search.best_params_, search.best_score_)
print(search.score(X_test, y_test))`
        },
        {
          title: "2/2 · Lasso의 선택된 특성 수 확인",
          content: `from sklearn.linear_model import Lasso

lasso_pipe = make_pipeline(
    PolynomialFeatures(degree=3, include_bias=False),
    StandardScaler(),
    Lasso(alpha=0.01, max_iter=10000)
)
lasso_pipe.fit(X_train, y_train)
coef = lasso_pipe.named_steps["lasso"].coef_
print("non-zero:", np.count_nonzero(coef), "/", coef.size)`
        }
      ],
      afterBody: S`
        <p>여기서 다항 변환과 표준화 모두 교차검증 폴드 안에서 fit됩니다. Lasso가 0으로 만든 항이 항상 불필요하다는 뜻은 아니며, 상관된 특성 중 임의로 하나만 남길 수 있으므로 분할이 바뀌어도 선택이 안정적인지 확인합니다.</p>
      `
    }
  ]);

  insertAfter("05-classification", "softmax", [
    {
      id: "fish-multiclass-lab",
      kicker: "07 · GUIDED LAB",
      title: "생선 7종: K-NN 확률에서 다항 로지스틱 회귀로",
      body: labIntro({
        goal: "다중 클래스의 확률 벡터와 클래스 순서를 해석한다.",
        input: "무게·길이·대각선·높이·너비",
        output: "7개 클래스 확률과 예측 라벨",
        checks: "classes_, 확률 합, decision_function shape"
      }),
      codes: [
        {
          title: "1/3 · 분할과 표준화",
          content: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X = fish[["Weight", "Length", "Diagonal", "Height", "Width"]].to_numpy()
y = fish["Species"].to_numpy()
X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=42
)
scaler = StandardScaler().fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)`
        },
        {
          title: "2/3 · K-NN의 이웃 비율",
          content: `from sklearn.neighbors import KNeighborsClassifier

kn = KNeighborsClassifier(n_neighbors=3).fit(X_train_s, y_train)
proba = kn.predict_proba(X_test_s[:5])
print(kn.classes_)
print(np.round(proba, 3))
print(proba.sum(axis=1))`
        },
        {
          title: "3/3 · 다항 로지스틱 확률",
          content: `from sklearn.linear_model import LogisticRegression

lr = LogisticRegression(C=20, max_iter=1000)
lr.fit(X_train_s, y_train)
logits = lr.decision_function(X_test_s[:5])
proba = lr.predict_proba(X_test_s[:5])
print(logits.shape, proba.shape)
print(lr.classes_[np.argmax(proba, axis=1)])`
        }
      ],
      afterBody: S`
        <p>로지스틱 회귀의 <code>C</code>는 규제 강도의 역수라 값이 클수록 규제가 약합니다. 훈련·테스트 점수와 클래스별 혼동을 함께 보고, 확률이 실제 빈도와 맞는지 필요하면 calibration도 확인합니다.</p>
      `
    }
  ]);

  insertAfter("05-classification", "batch-step-epoch", [
    {
      id: "sgd-svm-lab",
      kicker: "10 · GUIDED LAB",
      title: "SGD의 에포크 곡선과 SVM 경계를 비교하기",
      body: labIntro({
        goal: "점진 학습에서 과대적합 시점을 찾고 손실 선택으로 모델을 바꾼다.",
        input: "표준화된 다중 클래스 생선 특성",
        output: "에포크별 점수 곡선, logistic loss와 hinge loss 비교",
        checks: "첫 partial_fit의 classes, random_state, max_iter"
      }),
      codes: [
        {
          title: "1/2 · partial_fit으로 학습 곡선 기록",
          content: `from sklearn.linear_model import SGDClassifier

sgd = SGDClassifier(loss="log_loss", random_state=42)
classes = np.unique(y_train)
train_score, val_score = [], []

for epoch in range(300):
    sgd.partial_fit(X_train_s, y_train, classes=classes)
    train_score.append(sgd.score(X_train_s, y_train))
    val_score.append(sgd.score(X_test_s, y_test))

best_epoch = int(np.argmax(val_score))
print(best_epoch, val_score[best_epoch])`
        },
        {
          title: "2/2 · hinge loss로 선형 SVM 학습",
          content: `linear_svm = SGDClassifier(
    loss="hinge",
    max_iter=100,
    tol=None,
    random_state=42
)
linear_svm.fit(X_train_s, y_train)
print(linear_svm.score(X_train_s, y_train))
print(linear_svm.score(X_test_s, y_test))`
        }
      ],
      afterBody: S`
        <p>같은 SGD 최적화기를 사용해도 <code>loss="log_loss"</code>면 로지스틱 회귀, <code>loss="hinge"</code>면 선형 SVM 목적을 학습합니다. 옵티마이저와 모델의 목적함수를 분리해서 이해하세요.</p>
      `
    }
  ]);

  insertAfter("06-trees", "tree-anatomy-worked", [
    {
      id: "wine-tree-lab",
      kicker: "03 · GUIDED LAB",
      title: "레드·화이트 와인: 설명 가능한 트리 만들기",
      body: labIntro({
        goal: "알코올·당도·pH 질문으로 와인을 분류하고 트리를 읽는다.",
        input: "6497행의 세 수치 특성과 이진 타깃",
        output: "트리 규칙, 특성 중요도, 훈련·테스트 정확도",
        checks: "루트 질문, gini, samples, value, max_depth"
      }),
      codes: [
        {
          title: "1/2 · 데이터 검사와 계층 분할",
          content: `from sklearn.model_selection import train_test_split

print(wine.info())
print(wine.describe())
X = wine[["alcohol", "sugar", "pH"]].to_numpy()
y = wine["class"].to_numpy()
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)`
        },
        {
          title: "2/2 · 가지치기한 트리 시각화",
          content: `from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

tree = DecisionTreeClassifier(max_depth=3, random_state=42)
tree.fit(X_train, y_train)
print(tree.score(X_train, y_train), tree.score(X_test, y_test))
print(dict(zip(["alcohol", "sugar", "pH"], tree.feature_importances_)))

plt.figure(figsize=(14, 8))
plot_tree(tree, filled=True, feature_names=["alcohol", "sugar", "pH"],
          class_names=["red", "white"])
plt.show()`
        }
      ],
      afterBody: S`
        <p>루트부터 한 샘플의 경로를 직접 따라가며 임곗값을 적용해 보세요. 트리 그림의 <code>value</code>는 그 노드에 도달한 클래스별 훈련 샘플 수이며, 리프의 다수 클래스로 예측합니다.</p>
      `
    }
  ]);

  insertAfter("06-trees", "grid-random-search", [
    {
      id: "tree-search-lab",
      kicker: "09 · GUIDED LAB",
      title: "교차검증과 랜덤 탐색으로 트리 설정 고르기",
      body: labIntro({
        goal: "테스트를 보지 않고 트리 하이퍼파라미터를 선택한다.",
        input: "훈련 데이터만",
        output: "최적 설정, 평균 CV 점수, 마지막 테스트 점수",
        checks: "StratifiedKFold, 탐색 분포, best_estimator_"
      }),
      codes: [
        {
          title: "랜덤 탐색의 전체 프로토콜",
          content: `from scipy.stats import randint, uniform
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV
from sklearn.tree import DecisionTreeClassifier

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
params = {
    "max_depth": randint(3, 40),
    "min_samples_split": randint(2, 30),
    "min_samples_leaf": randint(1, 20),
    "min_impurity_decrease": uniform(0.0, 0.001)
}
search = RandomizedSearchCV(
    DecisionTreeClassifier(random_state=42),
    params, n_iter=100, cv=cv, n_jobs=-1, random_state=42
)
search.fit(X_train, y_train)
print(search.best_params_)
print(search.best_score_)
print(search.best_estimator_.score(X_test, y_test))`
        }
      ],
      afterBody: S`
        <p>테스트 점수는 마지막 줄 전까지 한 번도 사용하지 않습니다. 탐색 결과를 보고 범위를 다시 바꾸면 그 선택 역시 검증 과정이며, 최종 테스트는 계속 봉인되어야 합니다.</p>
      `
    }
  ]);

  insertAfter("06-trees", "ensemble-zoo", [
    {
      id: "tree-ensemble-lab",
      kicker: "13 · GUIDED LAB",
      title: "랜덤 포레스트·Extra Trees·히스토그램 부스팅 비교",
      body: labIntro({
        goal: "앙상블의 검증 성능·학습 시간·중요도를 같은 조건에서 비교한다.",
        input: "와인 훈련 특성",
        output: "5-fold 평균과 표준편차, permutation importance",
        checks: "동일 CV, n_jobs, random_state, held-out test"
      }),
      codes: [
        {
          title: "1/2 · 같은 교차검증으로 모델 비교",
          content: `from sklearn.ensemble import (
    RandomForestClassifier, ExtraTreesClassifier,
    HistGradientBoostingClassifier
)
from sklearn.model_selection import cross_validate

models = {
    "forest": RandomForestClassifier(n_estimators=300, n_jobs=-1, random_state=42),
    "extra": ExtraTreesClassifier(n_estimators=300, n_jobs=-1, random_state=42),
    "hist_gb": HistGradientBoostingClassifier(random_state=42)
}
for name, model in models.items():
    result = cross_validate(model, X_train, y_train, cv=5, n_jobs=-1)
    print(name, result["test_score"].mean(), result["test_score"].std())`
        },
        {
          title: "2/2 · 검증 데이터의 순열 중요도",
          content: `from sklearn.inspection import permutation_importance

best = models["forest"].fit(X_train, y_train)
importance = permutation_importance(
    best, X_test, y_test, n_repeats=20, random_state=42, n_jobs=-1
)
for name, value in sorted(
    zip(["alcohol", "sugar", "pH"], importance.importances_mean),
    key=lambda item: item[1], reverse=True
):
    print(name, value)`
        },
        {
          title: "3/3 · 외부 부스팅 구현의 동일한 평가 골격",
          content: `from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

boosters = {
    "xgboost": XGBClassifier(eval_metric="logloss", random_state=42),
    "lightgbm": LGBMClassifier(random_state=42, verbose=-1),
    "catboost": CatBoostClassifier(random_seed=42, verbose=False)
}
for name, model in boosters.items():
    score = cross_validate(model, X_train, y_train, cv=5, n_jobs=-1)
    print(name, score["test_score"].mean())`
        }
      ],
      afterBody: S`
        <p>순열 중요도는 평가 데이터에서 한 열의 대응만 깨뜨렸을 때 성능이 얼마나 감소하는지 측정합니다. 상관된 두 특성은 하나를 섞어도 다른 하나가 정보를 대신해 중요도가 작게 보일 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("07-unsupervised", "kmeans-objective", [
    {
      id: "fruit-kmeans-lab",
      kicker: "05 · GUIDED LAB",
      title: "과일 사진 300장: 평균 이미지에서 K-평균까지",
      body: labIntro({
        goal: "라벨 없이 사과·파인애플·바나나의 이미지 구조를 탐색한다.",
        input: "(300,100,100) 회색조 이미지 배열",
        output: "군집 라벨, 중심 이미지, inertia 곡선",
        checks: "reshape, labels_ 빈도, cluster_centers_, 여러 초기화"
      }),
      codes: [
        {
          title: "1/3 · 픽셀 벡터와 평균 이미지",
          content: `print(fruits.shape)                 # (300, 100, 100)
X = fruits.reshape(len(fruits), -1) # (300, 10000)

sample_mean = X.mean(axis=1)
pixel_mean = X[:100].mean(axis=0).reshape(100, 100)
plt.imshow(pixel_mean, cmap="gray_r")`
        },
        {
          title: "2/3 · K-평균과 중심 이미지",
          content: `from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, n_init=20, random_state=42)
labels = kmeans.fit_predict(X)
print(np.unique(labels, return_counts=True))

centers = kmeans.cluster_centers_.reshape(-1, 100, 100)
for center in centers:
    plt.figure()
    plt.imshow(center, cmap="gray_r")`
        },
        {
          title: "3/3 · elbow를 위한 inertia 기록",
          content: `inertias = []
for k in range(2, 8):
    model = KMeans(n_clusters=k, n_init=20, random_state=42)
    model.fit(X)
    inertias.append(model.inertia_)

plt.plot(range(2, 8), inertias, marker="o")
plt.xlabel("k"); plt.ylabel("inertia")`
        }
      ],
      afterBody: S`
        <p>군집 중심 이미지를 보고 각 군집의 의미를 사람이 붙입니다. 라벨이 있다면 평가 목적으로 교차표를 만들 수 있지만, 군집 0·1·2의 번호 자체를 정답 클래스 ID와 직접 비교하면 안 됩니다.</p>
      `
    }
  ]);

  insertAfter("07-unsupervised", "pca-mathematics", [
    {
      id: "fruit-pca-lab",
      kicker: "10 · GUIDED LAB",
      title: "10,000픽셀을 설명 분산 92%로 압축하고 복원하기",
      body: labIntro({
        goal: "PCA의 변환·역변환과 분류 속도 효과를 확인한다.",
        input: "(300,10000) 과일 픽셀 행렬",
        output: "축소 좌표, 복원 이미지, 누적 설명 분산",
        checks: "components_ shape, transform shape, reconstruction error"
      }),
      codes: [
        {
          title: "1/3 · 목표 설명 분산으로 성분 수 선택",
          content: `from sklearn.decomposition import PCA

pca = PCA(n_components=0.92, svd_solver="full")
Z = pca.fit_transform(X)
print("components:", pca.components_.shape)
print("compressed:", Z.shape)
print("variance kept:", pca.explained_variance_ratio_.sum())`
        },
        {
          title: "2/3 · 역변환과 재구성 오차",
          content: `X_hat = pca.inverse_transform(Z)
reconstruction_mse = np.mean((X - X_hat) ** 2, axis=1)
print(reconstruction_mse.mean())

fig, ax = plt.subplots(1, 2)
ax[0].imshow(X[0].reshape(100, 100), cmap="gray_r")
ax[1].imshow(X_hat[0].reshape(100, 100), cmap="gray_r")`
        },
        {
          title: "3/3 · 원본과 압축 특성의 분류 비교",
          content: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_validate

target = np.repeat([0, 1, 2], 100)
clf = LogisticRegression(max_iter=2000)
raw = cross_validate(clf, X, target, cv=5, return_train_score=False)
reduced = cross_validate(clf, Z, target, cv=5, return_train_score=False)
print(raw["test_score"].mean(), raw["fit_time"].mean())
print(reduced["test_score"].mean(), reduced["fit_time"].mean())`
        },
        {
          title: "4/4 · 2차원 PCA 공간에서 K-평균 시각화",
          content: `from sklearn.cluster import KMeans

pca2 = PCA(n_components=2)
Z2 = pca2.fit_transform(X)
clusters = KMeans(
    n_clusters=3, n_init=20, random_state=42
).fit_predict(Z2)

plt.scatter(Z2[:, 0], Z2[:, 1], c=clusters, cmap="viridis", s=24)
plt.xlabel("PC1")
plt.ylabel("PC2")
plt.title("K-means in PCA space")`
        }
      ],
      afterBody: S`
        <p>PCA 자체는 비지도학습이지만, 분류 성능을 공정하게 평가할 때는 PCA도 Pipeline 안에서 각 훈련 폴드에만 fit해야 합니다. 위 비교 코드는 개념 확인용이며 최종 평가는 <code>make_pipeline(PCA(...), LogisticRegression(...))</code>로 구성합니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "mnist-data-contract", [
    {
      id: "fashion-mnist-mlp-lab",
      kicker: "08 · GUIDED LAB",
      title: "Fashion-MNIST MLP: 데이터에서 학습 곡선까지",
      body: labIntro({
        goal: "Keras로 10종 패션 이미지를 분류하는 완전한 MLP 루프를 만든다.",
        input: "(60000,28,28) 훈련 이미지와 정수 라벨",
        output: "10개 클래스 확률, 검증 손실·정확도",
        checks: "픽셀 범위, 출력 10, sparse loss, parameter count"
      }),
      codes: [
        {
          title: "1/3 · 데이터 로드·분할·정규화",
          content: `import tensorflow as tf
from tensorflow import keras

(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
X_train = X_train.astype("float32") / 255.0
X_test = X_test.astype("float32") / 255.0

X_train, X_val = X_train[:-10000], X_train[-10000:]
y_train, y_val = y_train[:-10000], y_train[-10000:]
print(X_train.shape, y_train.shape, X_train.min(), X_train.max())`
        },
        {
          title: "2/3 · 모델·손실·옵티마이저",
          content: `model = keras.Sequential([
    keras.layers.Input(shape=(28, 28)),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation="relu"),
    keras.layers.Dense(10, activation="softmax")
])
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)
model.summary()`
        },
        {
          title: "3/3 · 학습·검증·테스트",
          content: `history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=128,
    validation_data=(X_val, y_val),
    verbose=2
)
print(model.evaluate(X_test, y_test, verbose=0))
prob = model.predict(X_test[:1], verbose=0)
print(prob.shape, prob.argmax(axis=1))`
        }
      ],
      afterBody: S`
        <p>정수 라벨을 유지했기 때문에 sparse categorical cross-entropy를 사용합니다. 라벨을 one-hot으로 바꾸었다면 categorical cross-entropy를 사용해야 합니다. 테스트는 모델·에포크 선택이 모두 끝난 뒤 평가합니다.</p>
      `
    }
  ]);

  insertAfter("08-deep-learning", "dropout-callback-details", [
    {
      id: "keras-training-tools-lab",
      kicker: "16 · GUIDED LAB",
      title: "Dropout·체크포인트·조기 종료로 최선의 모델 남기기",
      body: labIntro({
        goal: "과대적합을 추적하고 최선의 검증 에포크를 복구한다.",
        input: "Fashion-MNIST 훈련·검증 세트",
        output: "저장된 최선 모델과 학습 곡선",
        checks: "val_loss 최소점, stopped_epoch, 테스트 1회"
      }),
      codes: [
        {
          title: "규제층과 콜백을 포함한 학습",
          content: `model = keras.Sequential([
    keras.layers.Input(shape=(28, 28)),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation="relu"),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(10, activation="softmax")
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

callbacks = [
    keras.callbacks.ModelCheckpoint("best.keras", save_best_only=True),
    keras.callbacks.EarlyStopping(
        monitor="val_loss", patience=2, restore_best_weights=True
    )
]
history = model.fit(
    X_train, y_train, epochs=50,
    validation_data=(X_val, y_val), callbacks=callbacks
)`
        },
        {
          title: "학습 곡선과 최선 에포크 확인",
          content: `import numpy as np
import matplotlib.pyplot as plt

best_epoch = int(np.argmin(history.history["val_loss"])) + 1
print("best epoch:", best_epoch)
plt.plot(history.history["loss"], label="train loss")
plt.plot(history.history["val_loss"], label="validation loss")
plt.axvline(best_epoch - 1, color="black", linestyle="--")
plt.legend()`
        },
        {
          title: "SGD·RMSprop·Adam을 같은 조건에서 비교",
          content: `def make_model():
    return keras.Sequential([
        keras.layers.Input((28, 28)),
        keras.layers.Flatten(),
        keras.layers.Dense(100, activation="relu"),
        keras.layers.Dense(10, activation="softmax")
    ])

for optimizer in [
    keras.optimizers.SGD(1e-3),
    keras.optimizers.RMSprop(1e-3),
    keras.optimizers.Adam(1e-3)
]:
    trial = make_model()
    trial.compile(optimizer=optimizer,
                  loss="sparse_categorical_crossentropy",
                  metrics=["accuracy"])
    result = trial.fit(
        X_train, y_train, epochs=5, verbose=0,
        validation_data=(X_val, y_val)
    )
    print(optimizer.name, result.history["val_loss"][-1])`
        }
      ]
    }
  ]);

  insertAfter("09-cnn", "cnn-shape-ledger", [
    {
      id: "fashion-cnn-lab",
      kicker: "10 · GUIDED LAB",
      title: "Fashion-MNIST CNN: 형상을 보존하며 특징 추출하기",
      body: labIntro({
        goal: "Conv–Pool 블록과 Dense 헤드로 이미지 분류기를 학습한다.",
        input: "(B,28,28,1) 회색조 이미지",
        output: "10개 클래스 확률과 저장된 최선 CNN",
        checks: "각 층 출력 shape, Conv 파라미터 수, 테스트 전처리"
      }),
      codes: [
        {
          title: "1/2 · CNN 구조",
          content: `cnn = keras.Sequential([
    keras.layers.Input(shape=(28, 28, 1)),
    keras.layers.Conv2D(32, 3, padding="same", activation="relu"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, 3, padding="same", activation="relu"),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation="relu"),
    keras.layers.Dropout(0.4),
    keras.layers.Dense(10, activation="softmax")
])
cnn.summary()`
        },
        {
          title: "2/2 · 채널 축 추가 후 학습",
          content: `X_train_cnn = X_train[..., np.newaxis]
X_val_cnn = X_val[..., np.newaxis]
X_test_cnn = X_test[..., np.newaxis]

cnn.compile(optimizer="adam", loss="sparse_categorical_crossentropy",
            metrics=["accuracy"])
cnn.fit(
    X_train_cnn, y_train, epochs=20,
    validation_data=(X_val_cnn, y_val),
    callbacks=callbacks
)
print(cnn.evaluate(X_test_cnn, y_test))`
        }
      ],
      afterBody: S`
        <p>Dense 모델과 달리 28×28 공간을 유지하고 마지막에만 펼칩니다. 한 테스트 이미지의 shape가 \((28,28,1)\)이라면 예측 전 \((1,28,28,1)\) 배치 축이 필요합니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "augmentation", [
    {
      id: "asl-cnn-lab",
      kicker: "12 · GUIDED LAB",
      title: "ASL: Dense 과대적합을 CNN과 증강으로 해결하기",
      body: labIntro({
        goal: "수화 이미지의 공간 구조와 관측 변화를 모델에 반영한다.",
        input: "28×28 회색조 ASL 이미지와 24개 정적 문자 라벨",
        output: "24개 클래스 확률과 검증 정확도",
        checks: "J·Z 제외, 채널 축, one-hot/sparse 계약, 반전의 의미"
      }) + S`
        <p>J와 Z는 동작 궤적이 필요한 문자라 정적 이미지 데이터에서 제외됩니다. 클래스 수가 24인지 라벨 사전에서 직접 확인합니다. 수화의 좌우 방향이 의미를 바꿀 수 있으므로 가로 반전은 데이터 정의를 확인한 뒤 사용합니다.</p>
      `,
      codes: [
        {
          title: "1/2 · ASL용 CNN",
          content: `asl = keras.Sequential([
    keras.layers.Input(shape=(28, 28, 1)),
    keras.layers.Conv2D(75, 3, padding="same", activation="relu"),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(50, 3, padding="same", activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(25, 3, padding="same", activation="relu"),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(512, activation="relu"),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(24, activation="softmax")
])`
        },
        {
          title: "2/2 · 훈련에만 적용하는 증강",
          content: `augment = keras.Sequential([
    keras.layers.RandomRotation(0.03),
    keras.layers.RandomZoom(0.1),
    keras.layers.RandomTranslation(0.1, 0.1)
])

model = keras.Sequential([augment, asl])
model.compile(optimizer="adam", loss="categorical_crossentropy",
              metrics=["accuracy"])
model.fit(X_train, y_train_onehot, epochs=20,
          validation_data=(X_val, y_val_onehot))`
        }
      ],
      afterBody: S`
        <p>훈련 정확도만 높고 검증이 낮다면 에포크를 늘리기보다 오분류 이미지와 분포 차이를 확인합니다. 증강층은 <code>training=True</code>에서만 무작위로 동작하고 평가·예측에서는 꺼집니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "fine-tuning-protocol", [
    {
      id: "vgg-transfer-lab",
      kicker: "17 · GUIDED LAB",
      title: "VGG16: 사전학습 분류에서 전이학습까지",
      body: labIntro({
        goal: "ImageNet 표현을 작은 사용자 데이터셋의 이진·다중 분류에 재사용한다.",
        input: "VGG16 규격의 컬러 이미지 배치",
        output: "새 클래스 헤드와 미세조정 모델",
        checks: "preprocess_input, trainable 수, from_logits, 작은 learning rate"
      }),
      codes: [
        {
          title: "1/3 · 원래 VGG16 예측 사용",
          content: `from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input, decode_predictions

imagenet_model = VGG16(weights="imagenet")
batch = preprocess_input(image_batch.astype("float32"))
prediction = imagenet_model.predict(batch)
print(decode_predictions(prediction, top=5))`
        },
        {
          title: "2/3 · 기반 모델 동결과 새 헤드",
          content: `base = VGG16(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)
base.trainable = False

inputs = keras.Input(shape=(224, 224, 3))
x = keras.applications.vgg16.preprocess_input(inputs)
x = base(x, training=False)
x = keras.layers.GlobalAveragePooling2D()(x)
x = keras.layers.Dropout(0.2)(x)
outputs = keras.layers.Dense(1)(x)  # logit
transfer = keras.Model(inputs, outputs)
transfer.compile(
    optimizer="adam",
    loss=keras.losses.BinaryCrossentropy(from_logits=True),
    metrics=[keras.metrics.BinaryAccuracy(threshold=0.0)]
)`
        },
        {
          title: "3/3 · 일부 층 해제 후 작은 학습률",
          content: `base.trainable = True
for layer in base.layers[:-4]:
    layer.trainable = False

# trainable 변경 뒤 반드시 다시 compile
transfer.compile(
    optimizer=keras.optimizers.RMSprop(learning_rate=1e-5),
    loss=keras.losses.BinaryCrossentropy(from_logits=True),
    metrics=[keras.metrics.BinaryAccuracy(threshold=0.0)]
)
transfer.fit(train_ds, validation_data=val_ds, epochs=10,
             callbacks=callbacks)`
        }
      ],
      afterBody: S`
        <p>Dense 출력에 활성화가 없으므로 로짓을 반환하고 <code>from_logits=True</code>를 사용합니다. 시그모이드를 출력층에 넣었다면 <code>from_logits=False</code>여야 합니다. 이 불일치는 학습이 실행되더라도 잘못된 손실을 만들 수 있습니다.</p>
      `
    }
  ]);

  insertAfter("09-cnn", "cnn-evaluation-loading", [
    {
      id: "cnn-feature-map-lab",
      kicker: "16 · GUIDED LAB",
      title: "저장한 CNN의 중간 특징맵을 직접 보기",
      body: labIntro({
        goal: "첫째·둘째 합성곱층이 한 이미지에서 활성화한 패턴을 시각화한다.",
        input: "저장한 CNN과 전처리된 이미지 한 장",
        output: "(1,H,W,C) 중간 특징맵",
        checks: "선택한 layer 이름, 동일 전처리, 채널별 스케일"
      }) + S`
        <p>중간층의 출력도 하나의 Keras 모델로 만들 수 있습니다. 초반 특징맵은 엣지·질감처럼 해석하기 쉬운 경우가 많고 깊은 층은 더 추상적이지만, 활성값 하나를 곧바로 사람이 붙인 개념과 동일시해서는 안 됩니다.</p>
      `,
      codes: [
        {
          title: "합성곱층 출력을 새 모델로 연결",
          content: `model = keras.models.load_model("best-cnn.keras")
conv_layers = [
    layer for layer in model.layers
    if isinstance(layer, keras.layers.Conv2D)
]
activation_model = keras.Model(
    inputs=model.input,
    outputs=[layer.output for layer in conv_layers]
)

image = X_test_cnn[0:1]  # (1, 28, 28, 1), 이미 0~1
feature_maps = activation_model.predict(image, verbose=0)

for layer, fmap in zip(conv_layers, feature_maps):
    print(layer.name, fmap.shape)
    count = min(16, fmap.shape[-1])
    fig, axes = plt.subplots(2, 8, figsize=(12, 3))
    for channel, axis in enumerate(axes.flat):
        axis.axis("off")
        if channel < count:
            axis.imshow(fmap[0, :, :, channel], cmap="viridis")`
        }
      ],
      afterBody: S`
        <p>서로 다른 이미지에서 같은 채널이 어떤 패턴에 일관되게 반응하는지 비교하세요. 특징맵마다 값 범위가 다르므로 색의 밝기만으로 서로 다른 채널의 반응 세기를 직접 비교하지 않습니다.</p>
      `
    }
  ]);

  insertAfter("10-rnn", "tokenization-padding", [
    {
      id: "imdb-rnn-lab",
      kicker: "09 · GUIDED LAB",
      title: "IMDB 리뷰: 정수 토큰을 감성 하나로 압축하기",
      body: labIntro({
        goal: "리뷰 토큰 순서를 RNN/LSTM으로 읽어 긍정·부정을 분류한다.",
        input: "(B,T) 패딩된 토큰 ID",
        output: "이진 로짓 또는 확률",
        checks: "vocabulary cap, padding, masking, validation loss"
      }),
      codes: [
        {
          title: "1/2 · 사전 크기 제한과 패딩",
          content: `from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences

vocab_size = 10000
max_len = 200
(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(
    num_words=vocab_size
)
X_train = pad_sequences(X_train, maxlen=max_len, padding="pre", truncating="pre")
X_test = pad_sequences(X_test, maxlen=max_len, padding="pre", truncating="pre")
print(X_train.shape, y_train.shape)`
        },
        {
          title: "2/2 · Embedding–LSTM 이진 분류",
          content: `model = keras.Sequential([
    keras.layers.Input(shape=(max_len,)),
    keras.layers.Embedding(vocab_size, 32, mask_zero=True),
    keras.layers.LSTM(64),
    keras.layers.Dense(1, activation="sigmoid")
])
model.compile(optimizer="adam", loss="binary_crossentropy",
              metrics=["accuracy"])
model.fit(
    X_train, y_train,
    epochs=10, batch_size=128,
    validation_split=0.2,
    callbacks=[keras.callbacks.EarlyStopping(
        patience=2, restore_best_weights=True
    )]
)`
        }
      ],
      afterBody: S`
        <p><code>mask_zero=True</code>는 토큰 0을 패딩으로 취급해 순환층이 실제 문장 길이와 구분하게 합니다. 사전 밖 단어, 잘린 앞부분, 최대 길이 선택이 성능과 편향에 미치는 영향을 함께 봅니다.</p>
      `
    }
  ]);

  insertAfter("10-rnn", "generation-decoding", [
    {
      id: "headline-generator-lab",
      kicker: "14 · GUIDED LAB",
      title: "헤드라인 생성: 접두사–다음 토큰 데이터 만들기",
      body: labIntro({
        goal: "텍스트 문장을 여러 지도학습 쌍으로 바꾸고 LSTM으로 다음 단어를 생성한다.",
        input: "헤드라인 문자열 모음",
        output: "사전 전체의 다음 토큰 확률",
        checks: "word_index, max_sequence_len, predictors/labels shape, decoding"
      }),
      codes: [
        {
          title: "1/3 · 토큰화와 접두사 시퀀스",
          content: `from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(headlines)
sequences = []
for line in headlines:
    ids = tokenizer.texts_to_sequences([line])[0]
    for end in range(2, len(ids) + 1):
        sequences.append(ids[:end])

max_len = max(map(len, sequences))
sequences = pad_sequences(sequences, maxlen=max_len, padding="pre")`
        },
        {
          title: "2/3 · 입력·타깃 분리와 LSTM",
          content: `import numpy as np
from tensorflow import keras

X = sequences[:, :-1]
y = sequences[:, -1]
vocab_size = len(tokenizer.word_index) + 1

model = keras.Sequential([
    keras.layers.Input(shape=(max_len - 1,)),
    keras.layers.Embedding(vocab_size, 10),
    keras.layers.LSTM(100),
    keras.layers.Dropout(0.1),
    keras.layers.Dense(vocab_size, activation="softmax")
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")
model.fit(X, y, epochs=30)`
        },
        {
          title: "3/3 · 다음 단어를 반복 생성",
          content: `def generate(seed, count):
    text = seed
    for _ in range(count):
        ids = tokenizer.texts_to_sequences([text])[0]
        padded = pad_sequences([ids], maxlen=max_len - 1, padding="pre")
        prob = model.predict(padded, verbose=0)[0]
        next_id = int(np.argmax(prob))
        next_word = tokenizer.index_word.get(next_id, "<OOV>")
        text += " " + next_word
    return text

print(generate("artificial intelligence", 8))`
        }
      ],
      afterBody: S`
        <p>원-핫 라벨을 만들지 않고 정수 다음 토큰을 유지했으므로 sparse categorical cross-entropy를 사용했습니다. 생성 품질은 훈련 손실뿐 아니라 학습 데이터의 크기·다양성, 토큰화와 디코딩 정책에 크게 좌우됩니다.</p>
      `
    }
  ]);

  insertAfter("11-dli-practicum", "containers-and-environment", [
    {
      id: "notebook-by-notebook",
      kicker: "04 · PRACTICUM INDEX",
      title: "열 개 노트북에서 반드시 설명할 수 있어야 하는 것",
      body: S`
        <table class="comparison-table">
          <thead><tr><th>단계</th><th>만드는 것</th><th>완료 기준</th></tr></thead>
          <tbody>
            <tr><td>00 JupyterLab</td><td>실행 환경과 GPU 상태</td><td>재시작 후 전체 실행, 상태·파일 위치 설명</td></tr>
            <tr><td>01 MNIST</td><td>784→512→512→10 MLP</td><td>평탄화·정규화·범주화·softmax/CE 설명</td></tr>
            <tr><td>02 ASL Dense</td><td>24개 수화 문자 분류</td><td>훈련/검증 격차를 과대적합으로 진단</td></tr>
            <tr><td>03 ASL CNN</td><td>Conv·BN·Pool·Dropout 모델</td><td>각 층의 shape와 역할 계산</td></tr>
            <tr><td>04a Augmentation</td><td>회전·확대·이동 기반 배치</td><td>정답 보존 변환과 훈련 전용 동작 설명</td></tr>
            <tr><td>04b Predictions</td><td>저장 모델로 새 이미지 추론</td><td>resize·grayscale·batch·normalize 재현</td></tr>
            <tr><td>05a VGG16</td><td>ImageNet 사전학습 예측</td><td>모델 전처리와 top-k 클래스 해석</td></tr>
            <tr><td>05b Transfer</td><td>특정 강아지 이진 분류</td><td>동결·새 헤드·미세조정 순서 설명</td></tr>
            <tr><td>06 Headline</td><td>Embedding–LSTM 다음 단어 모델</td><td>접두사 데이터와 반복 생성을 설명</td></tr>
            <tr><td>07 Assessment</td><td>6개 신선/상한 과일 분류</td><td>92% 이상뿐 아니라 완전한 평가 파이프라인</td></tr>
          </tbody>
        </table>
        <p>노트북을 “실행했다”는 것은 완료 기준이 아닙니다. 입력 한 배치의 shape, 출력 한 행의 의미, 손실 선택 이유, 검증 곡선의 상태와 새 입력 전처리를 말로 설명할 수 있어야 합니다.</p>
      `,
      codes: [
        {
          title: "환경 확인 · 버전, GPU, 재현성",
          content: `import random
import numpy as np
import tensorflow as tf

print("TensorFlow:", tf.__version__)
print("GPU:", tf.config.list_physical_devices("GPU"))

random.seed(42)
np.random.seed(42)
tf.keras.utils.set_random_seed(42)`
        },
        {
          title: "배치 하나로 입력–출력 계약 점검",
          content: `images, labels = next(iter(train_ds))
print("images:", images.shape, images.dtype)
print("labels:", labels.shape, labels.dtype)

logits_or_prob = model(images[:2], training=False)
print("model output:", logits_or_prob.shape)
print("finite:", tf.reduce_all(tf.math.is_finite(logits_or_prob)).numpy())

# model.fit 전에 클래스 수·라벨 표현·출력 차원이 맞는지 확인
model.summary()`
        }
      ]
    }
  ]);

  insertAfter("11-dli-practicum", "assessment-checklist", [
    {
      id: "assessment-blueprint",
      kicker: "12 · ASSESSMENT BLUEPRINT",
      title: "FIXME를 채우기 전에 평가 파이프라인을 설계한다",
      body: labIntro({
        goal: "6개 과일 클래스를 VGG16 전이학습으로 목표 성능까지 학습한다.",
        input: "훈련·검증 디렉터리 또는 image_dataset_from_directory",
        output: "6개 softmax 확률과 검증 정확도",
        checks: "class_names, 동결, 증강, categorical/sparse loss, fine-tuning"
      }),
      codes: [
        {
          title: "1/3 · 데이터셋과 클래스 계약 확인",
          content: `print(train_ds.class_names)
assert train_ds.class_names == val_ds.class_names

images, labels = next(iter(train_ds))
print(images.shape, labels.shape)
print("pixel range:", tf.reduce_min(images).numpy(),
      tf.reduce_max(images).numpy())
print("label range:", tf.reduce_min(labels).numpy(),
      tf.reduce_max(labels).numpy())`
        },
        {
          title: "2/3 · 6개 클래스 전이학습 모델",
          content: `base = keras.applications.VGG16(
    weights="imagenet", include_top=False, input_shape=(224, 224, 3)
)
base.trainable = False

inputs = keras.Input((224, 224, 3))
x = keras.layers.RandomFlip("horizontal")(inputs)
x = keras.layers.RandomRotation(0.05)(x)
x = keras.applications.vgg16.preprocess_input(x)
x = base(x, training=False)
x = keras.layers.GlobalAveragePooling2D()(x)
x = keras.layers.Dropout(0.2)(x)
outputs = keras.layers.Dense(6, activation="softmax")(x)
model = keras.Model(inputs, outputs)
model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])`
        },
        {
          title: "3/3 · 동결 학습 뒤 미세조정",
          content: `model.fit(train_ds, validation_data=val_ds, epochs=10,
          callbacks=callbacks)

base.trainable = True
for layer in base.layers[:-4]:
    layer.trainable = False
model.compile(
    optimizer=keras.optimizers.RMSprop(1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)
model.fit(train_ds, validation_data=val_ds, epochs=10,
          callbacks=callbacks)
print(model.evaluate(val_ds))`
        }
      ],
      afterBody: S`
        <p><code>train_ds.class_names</code>의 여섯 클래스 순서를 저장하고 예측 해석에 그대로 사용합니다. 디렉터리 로더가 정수 라벨을 만들었다는 가정에서 sparse loss를 골랐습니다. one-hot 라벨이면 categorical loss로 바꿉니다.</p>
      `
    }
  ]);

  insertAfter("12-anomaly", "threshold-calibration", [
    {
      id: "anomaly-pipeline-lab",
      kicker: "06 · GUIDED LAB",
      title: "이상 점수에서 운영 임곗값까지",
      body: labIntro({
        goal: "정상 검증 분포와 경보 예산으로 재구성 오차 임곗값을 정한다.",
        input: "정상 중심 훈련 데이터와 라벨 있는 검증 일부",
        output: "이상 점수, 임곗값, precision·recall",
        checks: "훈련 전처리 재사용, contamination, 테스트 봉인"
      }),
      codes: [
        {
          title: "검증 정상 점수의 백분위로 초기 임곗값 설정",
          content: `from sklearn.metrics import precision_recall_fscore_support

X_hat = autoencoder.predict(X_val_scaled, verbose=0)
score = np.mean((X_val_scaled - X_hat) ** 2, axis=1)

normal_score = score[y_val == 0]
threshold = np.quantile(normal_score, 0.995)
pred = (score > threshold).astype(int)

precision, recall, f1, _ = precision_recall_fscore_support(
    y_val, pred, average="binary", zero_division=0
)
print(threshold, precision, recall, f1, pred.sum())`
        },
        {
          title: "라벨이 있을 때 PR 곡선으로 후보 임곗값 비교",
          content: `from sklearn.metrics import precision_recall_curve, average_precision_score

precision, recall, thresholds = precision_recall_curve(y_val, score)
f1 = 2 * precision[:-1] * recall[:-1] / (
    precision[:-1] + recall[:-1] + 1e-12
)
best = int(np.argmax(f1))
threshold = thresholds[best]

print("PR-AUC:", average_precision_score(y_val, score))
print("threshold:", threshold)
print("precision/recall/F1:",
      precision[best], recall[best], f1[best])`
        }
      ],
      afterBody: S`
        <p>99.5백분위는 정답이 아니라 정상 경보율 약 0.5%를 출발점으로 정한 정책입니다. 실제 라벨과 조사 처리량을 이용해 조정하고, 시간에 따라 점수 분포가 바뀌는지 모니터링합니다.</p>
      `
    }
  ]);

  if (window.THEORY_COVERAGE) {
    window.THEORY_COVERAGE.topics = chapters.reduce((sum, item) => sum + item.sections.length, 0);
    window.THEORY_COVERAGE.minutes = chapters.reduce((sum, item) => sum + item.minutes, 0);
  }
})();
