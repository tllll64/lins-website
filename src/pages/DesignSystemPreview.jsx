import React, { useState } from 'react';
import { Button, Input, Card, SegmentedControl } from '../design-system/components';
import { colors, spacing, typography } from '../design-system/tokens';

export const DesignSystemPreview = () => {
  const [inputValue, setInputValue] = useState('');
  const [segmentValue, setSegmentValue] = useState('option1');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: '40px 20px',
      fontFamily: typography.body.fontFamily,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: '600',
          color: colors.black.solid,
          marginBottom: '16px',
        }}>
          Design System
        </h1>
        <p style={{
          fontSize: '16px',
          color: colors.grey[40],
          marginBottom: '60px',
        }}>
          A comprehensive design system based on Figma design files
        </p>

        {/* Colors Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Colors
          </h2>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '500',
            color: colors.grey[40],
            marginBottom: '16px',
          }}>
            Primary Colors
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <div style={{
              height: '80px',
              background: colors.black.solid,
              borderRadius: '8px',
              border: `1px solid ${colors.grey[92]}`,
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontSize: '12px',
                color: colors.white.solid,
                background: colors.grey[40],
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                Black
              </span>
            </div>

            <div style={{
              height: '80px',
              background: colors.white.solid,
              borderRadius: '8px',
              border: `1px solid ${colors.grey[92]}`,
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontSize: '12px',
                color: colors.grey[56],
                background: colors.grey[98],
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                White
              </span>
            </div>

            <div style={{
              height: '80px',
              background: colors.azure[48],
              borderRadius: '8px',
              border: `1px solid ${colors.grey[92]}`,
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontSize: '12px',
                color: colors.white.solid,
                background: 'rgba(0,0,0,0.4)',
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                Azure 48
              </span>
            </div>

            <div style={{
              height: '80px',
              background: colors.grey[40],
              borderRadius: '8px',
              border: `1px solid ${colors.grey[92]}`,
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontSize: '12px',
                color: colors.white.solid,
                background: 'rgba(0,0,0,0.4)',
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                Grey 40
              </span>
            </div>
          </div>
        </section>

        {/* Button Component */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Button Component
          </h2>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '500',
            color: colors.grey[40],
            marginBottom: '16px',
          }}>
            Variants
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="primary" disabled>Disabled Button</Button>
          </div>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '500',
            color: colors.grey[40],
            marginBottom: '16px',
          }}>
            Sizes
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>

          <pre style={{
            background: colors.grey[98],
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            color: colors.grey[9],
          }}>
{`<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button size="small">Small</Button>`}
          </pre>
        </section>

        {/* Input Component */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Input Component
          </h2>

          <div style={{ maxWidth: '400px', marginBottom: '20px' }}>
            <Input
              label="Username"
              placeholder="Enter your username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div style={{ maxWidth: '400px', marginBottom: '20px' }}>
            <Input
              label="Disabled Input"
              placeholder="Disabled"
              disabled
            />
          </div>

          <pre style={{
            background: colors.grey[98],
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            color: colors.grey[9],
          }}>
{`<Input
  label="Username"
  placeholder="Enter your username"
  value={value}
  onChange={handleChange}
/>`}
          </pre>
        </section>

        {/* Card Component */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Card Component
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '20px',
          }}>
            <Card variant="default" padding="medium">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Default Card</h3>
              <p style={{ fontSize: '14px', color: colors.grey[40] }}>
                This is a default card with medium padding and a border.
              </p>
            </Card>

            <Card variant="elevated" padding="medium" hoverable>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Elevated Card</h3>
              <p style={{ fontSize: '14px', color: colors.grey[40] }}>
                This card has a shadow and hover effect.
              </p>
            </Card>

            <Card variant="filled" padding="medium">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Filled Card</h3>
              <p style={{ fontSize: '14px', color: colors.grey[40] }}>
                This card has a filled background.
              </p>
            </Card>
          </div>

          <pre style={{
            background: colors.grey[98],
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            color: colors.grey[9],
          }}>
{`<Card variant="default" padding="medium">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`}
          </pre>
        </section>

        {/* SegmentedControl Component */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Segmented Control
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <SegmentedControl
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              value={segmentValue}
              onChange={setSegmentValue}
            />
          </div>

          <p style={{ fontSize: '14px', color: colors.grey[40], marginBottom: '20px' }}>
            Selected: {segmentValue}
          </p>

          <pre style={{
            background: colors.grey[98],
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            color: colors.grey[9],
          }}>
{`<SegmentedControl
  options={[
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]}
  value={value}
  onChange={setValue}
/>`}
          </pre>
        </section>

        {/* Usage */}
        <section>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.black.solid,
            marginBottom: '24px',
          }}>
            Usage
          </h2>

          <p style={{ fontSize: '14px', color: colors.grey[40], marginBottom: '16px' }}>
            Import components and tokens from the design system:
          </p>

          <pre style={{
            background: colors.grey[98],
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            color: colors.grey[9],
          }}>
{`import { Button, Input, Card, SegmentedControl } from './design-system/components';
import { colors, spacing, typography } from './design-system/tokens';`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemPreview;
