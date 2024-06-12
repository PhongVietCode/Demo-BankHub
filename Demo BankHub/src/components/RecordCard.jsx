const RecordCard = ({
  amount,
  description,
  transactionDate,
  transactionDateTime,
}) => {
  const transferMoney = (amount) => {
    if (!amount) return;
    const roundMoney = Math.round(amount);
    const strAmount = roundMoney.toString();
    let i = strAmount.length - 1;
    let res = "";
    let index = 0;
    while (i >= 0) {
      res = strAmount[i] + res;
      index++;
      if (index == 3) {
        index = 0;
        if (strAmount[0] == "-") {
          if (i != 1) res = "." + res;
        }
        else{
          if (i != 0) res = "." + res;
        }
      }
      i--;
    }
    if(res[0] === '.'){
      res = res.substring(1)
    }
    return res;
  };
  // useEffect(() => {
  //   amount = transferMoney(amount)
  // });
  return (
    <div className="w-full flex flex-row ring-1 rounded-md ring-slate-200 p-4 shadow-lg items-center justify-between backdrop-blur-sm bg-white/30 gap-2 ">
      <div className="flex flex-row flex-1 gap-2 items-center">
        <div className="w-4 aspect-square rounded-full bg-blue-300"></div>
        <div className="flex flex-col flex-1">
          <div className="font-monterrat font-medium text-lg text-wrap">
            {description}
          </div>
          <div className="font-palanquin text-slate-gray text-xl">
            {transferMoney(amount)} VND
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-start">
        <div className="font-palanquin text-lg">{transactionDate}</div>
        <div className="font-palanquin text-lg text-slate-gray">
          {transactionDateTime.split("T")[1].split("+")[0]}
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
