export default class Animations {
  constructor(actions) {
    //console.log(actions);
    this.actions = actions;
    this.previousAnimation = null;
    this.isIdle = undefined;
    this.isWalking = undefined;
    this.isCrouched = undefined;
    this.goFaster = undefined;
    this.goForward = undefined;
    this.goLeft = undefined;
    this.goRight = undefined;
    this.toIdle();
  }

  play(actionName) {
    const action = this.actions[actionName];
    if (!action) {
      console.error('No action named', actionName);
      return;
    }
    action.reset();
    action.play();
    if (this.previousAnimation) {
      action.crossFadeFrom(this.previousAnimation, 0.1, true);
    }
    this.previousAnimation = action;
  }

  toIdle() {
    if (this.isIdle) return;
    this.play('Idle');
    this.isIdle = true;
    this.isWalking = false;
  }

  toWalk() {
    let actionName = this.goForward ? 'WalkForward' : 'WalkBackward';
    if (this.goLeft) actionName = 'WalkStrafeLeft';
    if (this.goRight) actionName = 'WalkStrafeRight';
    this.play(actionName);
    this.isIdle = false;
    this.isWalking = true;
    this.goFaster = false;
    //console.log('toWalk');
  }

  toRun() {
    let actionName = this.goForward ? 'RunForward' : 'RunBackward';
    if (this.goLeft) actionName = 'RunStrafeLeft';
    if (this.goRight) actionName = 'RunStrafeRight';
    this.play(actionName);
    this.isIdle = false;
    this.goFaster = true;
    //console.log('toRun');
  }

  moveForward(start) {
    //console.log('moveForward', start);
    this.goForward = true;
    if (start) {
      this.goFaster ? this.toRun() : this.toWalk();
    } else {
      this.toIdle()
    }
  }

  moveLeft(start) {
    //console.log('moveLeft', start);
    this.goLeft = start;
    this.goRight = false;
    if (start) {
      this.goFaster ? this.toRun() : this.toWalk();
    } else {
      this.toIdle()
    }
  }

  moveRight(start) {
    //console.log('moveRight', start);
    this.goLeft = false;
    this.goRight = start;
    if (start) {
      this.goFaster ? this.toRun() : this.toWalk();
    } else {
      this.toIdle()
    }
  }

  moveBackward(start) {
    //console.log('moveBackward', start);
    this.goForward = false;
    if (start) {
      this.goFaster ? this.toRun() : this.toWalk();
    } else {
      this.toIdle()
    }
  }

  toggleFaster(goFaster) {
    //console.log('toggleFaster', goFaster);
    if (this.isIdle) {
      this.goFaster = false;
      return;
    }
    
    if (this.isWalking && goFaster) {
      this.toRun();
      return;
    }

    if (this.goFaster && !goFaster) {
      this.toWalk();
      return;
    }
  }

  toggleCrouch(goCroush) {
    this.isCrouched = goCroush;
    //console.log('toggleCrouch', goCroush);
  }

  update(delta) {
    //console.log(delta);
  }
}