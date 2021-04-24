// 이전상태
export const initialState = {
  addItemLoading: false,
  addItemDone: false,
  addItemError: null,
  removeItemLoading: false,
  removeItemDone: false,
  removeItemError: null,
  mainItems: [
    {
      id: 1,
      category: 1,
      title: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/265/625/img/12625265_1.jpg?shrink=500:500&_v=20201105230016',
        alt: 'AMD Ryzen5 5600X',
      },
      price: 342090,
      startDate: '20210101',
      endDate: '20221231',
      content: `AMD(소켓AM4) / 4세대 (Zen 3) / 7nm / 6코어 / 12쓰레드 / 기본 클럭: 3.7GHz / 최대 클럭: 4.6GHz / L3 캐시: 32MB / TDP: 65W / PCIe4.0 / 메모리 규격: DDR4 / 3200MHz / 내장그래픽: 미탑재 / 기술 지원: StoreMI , Ryzen Master, VR Ready 프리미엄 / 쿨러: Wraith Stealth 포함`,
    },
    {
      id: 2,
      category: 1,
      title: '인텔 코어i5-11세대 11400 (로켓레이크S) (정품)',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/846/619/img/13619846_1.jpg?shrink=500:500&_v=20210317000027',
        alt: '인텔 i5 11400',
      },
      price: 239750,
      startDate: '20210102',
      endDate: '20221230',
      content: `인텔(소켓1200) / 14nm / 6코어 / 12쓰레드 / 기본 클럭: 2.6GHz / 최대 클럭: 4.4GHz / L3 캐시: 12MB / TDP: 65W / PCIe4.0 / 메모리 규격: DDR4 / 3200MHz / 내장그래픽: 탑재 / 인텔 UHD 730 / 기술 지원: 하이퍼스레딩 , 옵테인 / 쿨러: 인텔 기본쿨러 포함 / 출시가: 182달러(VAT별도)`,
    },
    {
      id: 3,
      category: 2,
      title: 'ASRock Z590 스틸레전드 디앤디컴',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/894/418/img/13418894_1.jpg?shrink=500:500&_v=20210315143301',
        alt: 'ASRock Z590 스틸레전드',
      },
      price: 262470,
      startDate: '20210103',
      endDate: '20221229',
      content: `인텔(소켓1200) / (인텔) Z590 / ATX (30.5x24.4cm) / 전원부: 14페이즈 / DDR4 / 메모리 용량: 최대 128GB / XMP / 옵테인 / VGA 연결: PCIe4.0 x16 / GPU 기술: CrossFire X / 그래픽 출력: HDMI , DP / PCIe 슬롯: 5개 / M.2: 3개 / SATA3: 6개 / PS/2: 콤보 1개 / USB 2.0: 후면 2개 / USB 3.0: 후면 2개 / USB 3.1: 후면 2개 / 기가비트 LAN / 2.5기가비트 LAN / UEFI / LED 라이트 / LED 헤더 / M.2 히트싱크 / POLYCHROME`,
    },
    {
      id: 4,
      category: 3,
      title: 'ASUS ROG STRIX 지포스 RTX 3090 O24G GAMING OC D6X 24GB',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/422/204/img/12204422_1.jpg?shrink=500:500&_v=20201221105317',
        alt: 'ASUS ROG STRIX RTX 3090 O24G GAMING OC D6X 24GB',
      },
      price: 3420000,
      startDate: '20210104',
      endDate: '20221228',
      content: `RTX 3090 / 8nm / 스트림 프로세서: 10496개 / PCIe4.0x16 / GDDR6X(DDR6X) / 출력단자: HDMI2.1 , DP1.4 / 부가기능: 제로팬(0-dB기술) , 멀티 VGA , 8K 해상도 지원 , 4K 해상도 지원 , HDR 지원 , Dual BIOS , HDCP 2.3 / 정격파워 750W 이상 / 전원 포트: 8핀 x3개 / 3개 팬 / 가로(길이): 318.5mm / 백플레이트 / LED 라이트 / PWM 커넥터 / AURA SYNC`,
    },
  ],
};

// 변수
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

// 더미 아이템 테스트
const dummyItems = {
  id: 98,
  category: 1,
  title: '아이유 예쁘당 헤헤',
  image: {
    src: 'https://pbs.twimg.com/media/EIlWXnoUEAAM7cy?format=jpg&name=large',
    alt: '아이유',
  },
  price: 999999999,
  startDate: '19930516',
  endDate: '20290203',
  content: `아이유 예쁘당 헤헤헤헤헤헤`,
};

// 상품 추가 액션
export const addItemRequestAction = (data) => ({
  type: ADD_ITEM_REQUEST,
  data,
});

// 상품 제거 액션
export const removeItemRequestAction = () => ({
  type: REMOVE_ITEM_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 상품 추가
    case ADD_ITEM_REQUEST:
      console.log('addItem 주문이여유~');
      return {
        ...state,
        addItemLoading: true,
        addItemDone: false,
        addItemError: null,
      };
    case ADD_ITEM_SUCCESS:
      // const category = state.
      console.log('addItem 성공했어유~');
      console.log(action.data);
      return {
        ...state,
        addItemLoading: false,
        addItemDone: true,
        mainItems: [...state.mainItems, dummyItems],
      };
    case ADD_ITEM_FAILURE:
      console.log('addItem 실패했어유~');
      return {
        ...state,
        addItemLoading: false,
        addItemError: action.error,
      };
    // 상품 제거
    case REMOVE_ITEM_REQUEST:
      return {
        ...state,
        removeItemLoading: true,
        removeItemDone: false,
        removeItemError: null,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        removeItemLoading: false,
        removeItemDone: true,
        // TODO 상품 제거
        mainItems: [...state.mainItems],
      };
    case REMOVE_ITEM_FAILURE:
      return {
        ...state,
        removeItemLoading: false,
        removeItemError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
