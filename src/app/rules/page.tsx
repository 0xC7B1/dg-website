'use client';

import { useState } from 'react';
import { DocLayout } from '@/components/layout/doc-layout';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { PageTransition } from '@/components/effects/page-transition';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import { cn } from '@/lib/utils';

// Rules data — in production this comes from MDX at build time
const rulesData = {
  quickstart: [
    {
      id: 'getting-started',
      title: '快速上手',
      content: `欢迎来到数字幽灵TRPG。本指南将帮助你在10分钟内了解游戏的核心机制。

你需要：一个社交媒体账号（用于角色扮演）、阅读本快速上手指南、加入官方群组。

基本流程：
1. 创建角色 — 使用角色创建规则设计你的角色
2. 注册 — 将角色信息提交给管理组审核
3. 开始游戏 — 以角色身份在社交平台上发布内容
4. 参与事件 — 关注官方发布的剧情事件并参与互动`,
    },
    {
      id: 'core-mechanics',
      title: '核心机制',
      content: `数字幽灵TRPG使用一套简化的规则系统，重点在于叙事和角色互动。

判定系统：当角色执行有风险的行为时，需要进行判定。

  判定值 = 基础属性 + 技能加成 + 1d20

• 大成功：判定值 ≥ 目标值 + 10
• 成功：判定值 ≥ 目标值
• 失败：判定值 < 目标值
• 大失败：判定值 ≤ 目标值 - 10

资源系统：每个角色有三种资源：
• 数据点（DP）：用于执行技术类行动
• 影响力（INF）：用于社交和信息收集
• 稳定值（STA）：角色的精神状态，降至0会触发"崩溃"`,
    },
    {
      id: 'glossary',
      title: '常用术语表',
      content: `大断裂 — 导致全球互联网崩溃的灾难性事件
重建纪元 — 大断裂后的新时代
灰山城 — 本企划的主要舞台
扇区 — 灰山城中的区划单位
数据矿工 — 在废弃服务器中搜寻数据残片的人
现实溢出 — 虚拟数据入侵物理现实的异常现象
CMYK — 角色人格档案的四个维度
管理局 — 灰山城的官方管理机构
崩溃 — 角色稳定值降至0时的状态`,
    },
  ],
  'full-rules': [
    {
      id: 'character-creation',
      title: '角色创建',
      content: `第一步：基本概念
每个玩家角色（PC）需要设定以下基本信息：姓名、年龄、职业背景、来到灰山城的理由。

第二步：属性分配
角色拥有四项基础属性，总共分配 28点：

  逻辑（LOG） 分析、推理、技术能力  范围 3-10
  感知（PER） 观察力、直觉、第六感  范围 3-10
  社交（SOC） 说服、欺骗、领导力    范围 3-10
  意志（WIL） 精神韧性、自控力      范围 3-10

第三步：选择技能
从技能列表中选择 3个专精技能 和 2个熟练技能。
专精技能在判定时获得 +4 加成，熟练技能获得 +2 加成。`,
    },
  ],
};

const sidebarItems = [
  { id: 'quickstart-header', label: '玩家手册', level: 0 },
  ...rulesData.quickstart.map((r) => ({ id: r.id, label: r.title, level: 1 })),
  { id: 'full-rules-header', label: '详细规则书', level: 0 },
  ...rulesData['full-rules'].map((r) => ({ id: r.id, label: r.title, level: 1 })),
];

export default function RulesPage() {
  const [activeId, setActiveId] = useState('getting-started');

  const allRules = [...rulesData.quickstart, ...rulesData['full-rules']];
  const activeRule = allRules.find((r) => r.id === activeId);

  const handleSelect = (id: string) => {
    if (id.endsWith('-header')) return;
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageTransition>
      <DocLayout
        sidebarTitle="规则书"
        sidebar={
          <SidebarNav
            items={sidebarItems.map((item) => ({
              ...item,
              ...(item.id.endsWith('-header') ? {} : {}),
            }))}
            activeId={activeId}
            onSelect={handleSelect}
          />
        }
      >
        <div className="max-w-3xl">
          <div className="mb-8">
            <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
              {'>'} RULES.DATABASE // 规则书
            </p>
          </div>

          {/* Quickstart section */}
          <div className="mb-12">
            <h2 className="font-mono text-lg text-accent-cyan tracking-[0.15em] mb-4">
              玩家手册
            </h2>
            <DotMatrixLine className="mb-6" />

            {rulesData.quickstart.map((rule) => (
              <div key={rule.id} id={rule.id} className="mb-10 scroll-mt-20">
                <h3 className="font-mono text-base text-text-primary tracking-wider mb-4">
                  {rule.title}
                </h3>
                <div className="bg-bg-secondary border border-border-default p-5 pixel-border-sm">
                  <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                    {rule.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Full rules section */}
          <div>
            <h2 className="font-mono text-lg text-accent-cyan tracking-[0.15em] mb-4">
              详细规则书
            </h2>
            <DotMatrixLine className="mb-6" />

            {rulesData['full-rules'].map((rule) => (
              <div key={rule.id} id={rule.id} className="mb-10 scroll-mt-20">
                <h3 className="font-mono text-base text-text-primary tracking-wider mb-4">
                  {rule.title}
                </h3>
                <div className="bg-bg-secondary border border-border-default p-5 pixel-border-sm">
                  <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                    {rule.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocLayout>
    </PageTransition>
  );
}
