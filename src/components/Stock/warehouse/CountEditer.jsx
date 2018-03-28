import React, { Component, PropTypes } from 'react';
import css from './count_editer.less';
import { Button, Input } from 'antd';

export class CountEditer extends Component {
  state = {
    count: 1,
  }

  componentWillMount() {
    this.setState({ count: this.props.defaultCount });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ count: nextProps.count });
  }

  reduceCount(e) {
    let count = this.state.count;
    if (count > 0) {
      count -= 1
      this.setState({ count: count });
    }
    this.props.onChange(count);
  }

  addCount() {
    let count = this.state.count;
    count += 1;
    this.setState({ count: count });
    this.props.onChange(count);
  }

  handleChange(e) {
    let count = Number(e.target.value);
    count = count < 0 || count ? 0 : count;
    this.setState({ count: count });
  }

  render() {
    return (
      <div className={css.form_count}>
        <h3>数量</h3>
        <div className={css.count_input}>
          <Button
            shape="circle"
            icon="minus"
            className={css.count_button}
            onClick={this.reduceCount.bind(this)}
          />
          <Input
            type="number"
            value={this.state.count}
            max={99}
            onChange={this.handleChange.bind(this)}
          />
          <Button
            shape="circle"
            icon="plus"
            className={css.count_button}
            onClick={this.addCount.bind(this)}
          />
        </div>
      </div>
    );
  }
}

CountEditer.defaultProps = {
  onChange: () => {},
  count: 1,
}

CountEditer.propTypes = {
  onChange: PropTypes.func,
  count: PropTypes.number,
}
