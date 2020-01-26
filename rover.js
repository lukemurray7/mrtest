const updatePosition = (initialPosition, instructions) => {
  // if theres no instructions return the initial position
  if (!instructions) {
    return initialPosition;
  }

  // turn the initial position from a string into an array, and convert any numbers to numbers instead of strings.
  let newPosition = initialPosition.split(' ').map((x => Number(x) ? Number(x) : x));

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i]) {
      case 'L':
        if (newPosition[2] === "N") {
          newPosition[2] = "W";
        } else if (newPosition[2] === "E") {
          newPosition[2] = "N";
        } else if (newPosition[2] === "S") {
          newPosition[2] = "E";
        } else {
          newPosition[2] = "S";
        }
        break;
      case 'R':
        if (newPosition[2] === "N") {
          newPosition[2] = "E";
        } else if (newPosition[2] === "E") {
          newPosition[2] = "S";
        } else if (newPosition[2] === "S") {
          newPosition[2] = "W";
        } else {
          newPosition[2] = "N";
        }
        break;
      case 'M':
        if (newPosition[2] === "N") {
          newPosition[1]++;
        } else if (newPosition[2] === "E") {
          newPosition[0]++;
        } else if (newPosition[2] === "S") {
          newPosition[1]--;
        } else {
          newPosition[0]--;
        }
        break;
      default:
        return initialPosition;
    }
  }

  // return in the same format it was passed in ie: a string seperated by spaces
  return newPosition.join(' ');
};


const getRoverOutputs = (input) => {
  /**
   split input on newline to get instructions, first item in array will be upper right coords - not used, slice to get rid of it.

   then loop in twos to get instructions for each rover
  */

  // empty output array
  const roverOutputs = [];

  const roverInstructions = input.split('\n').slice(1);
  for (let i = 0; i < roverInstructions.length; i += 2) {
    // for each rover call update position with the initial input and instructions
    // put the output in the roverOutputs array
    const roverResult = updatePosition(roverInstructions[i], roverInstructions[i + 1]);
    roverOutputs.push(roverResult);
  }

  // join the results seperated by newline to match the instruction document.
  return roverOutputs.join('\n');
};

module.exports = getRoverOutputs;
