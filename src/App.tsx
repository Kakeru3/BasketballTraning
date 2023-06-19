import './App.css';
import { Button, Input, Checkbox, Box, useToast } from '@chakra-ui/react'
import {
  ActionMeta,
  MultiValue,
  Select,
  GroupBase,
  OptionBase,
} from 'chakra-react-select'
import React, { useState } from 'react';

class CutBack implements OptionBase {
  constructor(
    public value: string,
    public label: string,
    public colorScheme: string,
  ) {}
}

class LastShoot implements OptionBase {
  constructor(
    public value: string,
    public label: string,
    public colorScheme: string,
  ) {}
}

const CutBacks: CutBack[] = [
  new CutBack('fc', 'フロントチェンジ', 'gray'),
  new CutBack('cop', 'チェンジオブペース', 'blue'),
  new CutBack('rt', 'ロールターン', 'yellow'),
  new CutBack('iso', 'インサイドアウト', 'pink'),
  new CutBack('ls', 'レッグスルー', 'green'),
  new CutBack('sh', 'シュートヘジ', 'red'),
  new CutBack('lm', 'ロッカーモーション', 'purple'),
  new CutBack('bc', 'バックチェンジ', 'teal'),
  new CutBack('dbc', 'ダブルバックチェンジ', 'orange'),
];

const LastShoots: LastShoot[] = [
  new LastShoot('uhl', 'アンダーハンドレイアップ', 'gray'),
  new LastShoot('ovhl', 'オーバーハンドレイアップ', 'blue'),
  new LastShoot('onhl', 'ワンハンドレイアップ', 'yellow'),
  new LastShoot('lbs', 'レイバックシュート', 'pink'),
  new LastShoot('rbs', 'リーチバックシュート', 'green'),
  new LastShoot('cus', 'クローズアップシュート', 'red'),
  new LastShoot('fs', 'フローターシュート', 'purple'),
  new LastShoot('gs', 'ギャロップステップ', 'teal'),
  new LastShoot('pl', 'パワーレイアップ', 'orange'),
  new LastShoot('eus', 'ユーロステップ', 'orange'),
];

function App() {

  const [selectedCutBacks, setSelectedCutBacks] = useState<CutBack[]>([]);

  const handleOnChangeSelectedCutBacks = (
    _newValue: MultiValue<CutBack>,
    actionMeta: ActionMeta<CutBack>,
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        if (actionMeta.option) {
          const CutBack = actionMeta.option;
          setSelectedCutBacks((prev) => [...prev, CutBack]);
          break;
        }
        break;

      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue) {
          const toDeleteCutBack = actionMeta.removedValue;

          setSelectedCutBacks((prev) =>
            prev.filter((CutBack) => CutBack.value != toDeleteCutBack.value),
          );
          break;
        }
        break;

      case 'clear':
        setSelectedCutBacks([]);
        break;
      default:
        break;
    }
  };

  const [selectedLastShoots, setSelectedLastShoots] = useState<LastShoot[]>([]);

  const handleOnChangeSelectedLastShoots = (
    _newValue: MultiValue<LastShoot>,
    actionMeta: ActionMeta<LastShoot>,
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        if (actionMeta.option) {
          const LastShoot = actionMeta.option;
          setSelectedLastShoots((prev) => [...prev, LastShoot]);
          break;
        }
        break;

      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue) {
          const toDeleteLastShoot = actionMeta.removedValue;

          setSelectedLastShoots((prev) =>
            prev.filter((LastShoot) => LastShoot.value != toDeleteLastShoot.value),
          );
          break;
        }
        break;

      case 'clear':
        setSelectedLastShoots([]);
        break;
      default:
        break;
    }
  };

  const [lastShoot, setLastShoot] = useState(false)
  const [dribbleInterval, setDribbleInterval] = useState<Number>()
  const [time, setTime] = useState<Number>()

  const toast = useToast()

  const handlerClick=()=>{
    if (selectedCutBacks == null || (lastShoot == true && selectedLastShoots == null) || dribbleInterval == null || time == null){
      console.log("test")
      return
    }

    var nowTime = time as number
    let timerid = setInterval(() => {
      if (nowTime > 0) {
        let randomValue = selectedCutBacks[Math.floor(Math.random() * selectedCutBacks.length)].label
        
        toast({
          title: randomValue,
          status: 'success',
          duration: 8000,
          isClosable: true,
        })

        const value = new SpeechSynthesisUtterance(randomValue)
        window.speechSynthesis.speak(value)

        nowTime--
        return
      } else if (lastShoot == true && selectedLastShoots != null) {
        let randomValue = selectedLastShoots[Math.floor(Math.random() * selectedLastShoots.length)].label

        toast({
          title: randomValue,
          status: 'warning',
          duration: 8000,
          isClosable: true,
        })

        const value = new SpeechSynthesisUtterance(randomValue)
        window.speechSynthesis.speak(value)
      }
      
      clearInterval(timerid);
    }, dribbleInterval as number * 1000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          バスケットボール練習用
        </p>
        <Box w='400px'>
          <Select<CutBack, true, GroupBase<CutBack>>
            isMulti={true}
            name='cutBackSelecter'
            placeholder='切り返しの種類'
            options={CutBacks}
            value={selectedCutBacks}
            onChange={handleOnChangeSelectedCutBacks}
            className='Selecter'
            size="sm"
          />
        </Box>
        <Input type='number' variant='filled' placeholder='間隔秒数' htmlSize={4} onChange={(e) => setDribbleInterval(e.target.valueAsNumber)} width='auto' margin={1} />
        <Input type='number' variant='filled' placeholder='回数' htmlSize={4} onChange={(e) => setTime(e.target.valueAsNumber)} width='auto' margin={3} />
        <Checkbox margin={1} onChange={(e) => setLastShoot(e.target.checked)}>Last Shoot</Checkbox>
        {lastShoot && 
        <Box w='400px'>
          <Select<LastShoot, true, GroupBase<LastShoot>>
            isMulti={true}
            name='LastShootSelecter'
            placeholder='シュートの種類'
            options={LastShoots}
            value={selectedLastShoots}
            onChange={handleOnChangeSelectedLastShoots}
            className='Selecter'
            size="sm"
          />
        </Box>
        }
        <Button colorScheme='teal' size='md' onClick={handlerClick} margin={4}>Start Training</Button>
      </header>
    </div>
  );
}

export default App;
