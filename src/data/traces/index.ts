import type { AgentTrace } from '@/types/trace'

export const successTrace: AgentTrace = {
  id: 'weather-success',
  title: '天气查询 — 成功',
  description: 'Agent 正确识别需求，调用天气 API，返回结果。最简单的 ReAct 循环。',
  outcome: 'success',
  steps: [
    {
      id: 's1', type: 'thought', label: 'Thought',
      content: '用户问北京天气，我需要调用 weather_api 来获取实时数据。',
      timestamp: 0,
    },
    {
      id: 's2', type: 'action', label: 'Action',
      content: 'call weather_api(city="北京", days=1)',
      timestamp: 500,
    },
    {
      id: 's3', type: 'observation', label: 'Observation',
      content: '{"temp": 22, "condition": "晴", "humidity": 45, "wind": "北风3级"}',
      timestamp: 1200,
    },
    {
      id: 's4', type: 'thought', label: 'Thought',
      content: '拿到了天气数据，温度22°C，晴天。可以直接回答用户了。',
      timestamp: 1400,
    },
    {
      id: 's5', type: 'answer', label: 'Answer',
      content: '北京今天晴，气温22°C，湿度45%，北风3级。适合外出活动。',
      timestamp: 1600,
    },
  ],
}

export const loopTrace: AgentTrace = {
  id: 'search-loop',
  title: '搜索循环 — Agent 陷入重复',
  description: 'Agent 搜索失败后反复用相同关键词重试，没有调整策略。这是最常见的 Agent 失败模式。',
  outcome: 'loop',
  steps: [
    {
      id: 'l1', type: 'thought', label: 'Thought',
      content: '用户问"量子计算对密码学的影响"，我搜索一下。',
      timestamp: 0,
    },
    {
      id: 'l2', type: 'action', label: 'Action',
      content: 'call web_search(query="量子计算密码学影响")',
      timestamp: 400,
    },
    {
      id: 'l3', type: 'observation', label: 'Observation',
      content: '{"results": [], "error": "no relevant results found"}',
      timestamp: 1000,
    },
    {
      id: 'l4', type: 'thought', label: 'Thought',
      content: '没搜到结果，再试一次。',
      timestamp: 1200,
    },
    {
      id: 'l5', type: 'action', label: 'Action (重复!)',
      content: 'call web_search(query="量子计算密码学影响")',
      timestamp: 1500,
    },
    {
      id: 'l6', type: 'observation', label: 'Observation',
      content: '{"results": [], "error": "no relevant results found"}',
      timestamp: 2100,
    },
    {
      id: 'l7', type: 'thought', label: 'Thought',
      content: '还是没结果，再搜一次...',
      timestamp: 2300,
    },
    {
      id: 'l8', type: 'action', label: 'Action (第3次重复!)',
      content: 'call web_search(query="量子计算密码学影响")',
      timestamp: 2600,
    },
    {
      id: 'l9', type: 'error', label: 'Error: 达到最大步数',
      content: '循环检测触发：连续3次相同的 action，Agent 未能调整策略。应该换关键词或换工具。',
      timestamp: 3200,
    },
  ],
}

export const failureTrace: AgentTrace = {
  id: 'tool-failure',
  title: '工具失败 — 优雅降级',
  description: 'API 调用失败后，Agent 反思并选择备选方案。展示了自我反思和错误恢复的正确模式。',
  outcome: 'failure',
  steps: [
    {
      id: 'f1', type: 'thought', label: 'Thought',
      content: '用户问明天上海的天气预报，调用天气 API。',
      timestamp: 0,
    },
    {
      id: 'f2', type: 'action', label: 'Action',
      content: 'call weather_api(city="上海", days=2)',
      timestamp: 400,
    },
    {
      id: 'f3', type: 'observation', label: 'Observation',
      content: '{"error": "503 Service Unavailable", "message": "API 限流，请稍后重试"}',
      timestamp: 1500,
    },
    {
      id: 'f4', type: 'thought', label: 'Thought (反思)',
      content: '天气 API 挂了（503）。不应该盲目重试，换个方案：用 web_search 搜索天气预报。',
      timestamp: 1700,
    },
    {
      id: 'f5', type: 'action', label: 'Action (备选方案)',
      content: 'call web_search(query="上海明天天气预报")',
      timestamp: 2000,
    },
    {
      id: 'f6', type: 'observation', label: 'Observation',
      content: '{"results": [{"title": "上海天气预报", "snippet": "明天多云转晴，18-25°C，东南风2级"}]}',
      timestamp: 2800,
    },
    {
      id: 'f7', type: 'thought', label: 'Thought',
      content: '通过 web_search 获取到了天气信息。虽然不是结构化数据，但足够回答用户。',
      timestamp: 3000,
    },
    {
      id: 'f8', type: 'answer', label: 'Answer',
      content: '上海明天多云转晴，气温18-25°C，东南风2级。（注：天气API暂时不可用，数据来自网页搜索）',
      timestamp: 3200,
    },
  ],
}

export const allTraces: AgentTrace[] = [successTrace, loopTrace, failureTrace]
